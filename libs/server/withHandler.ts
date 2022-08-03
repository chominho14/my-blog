import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}
// 백엔드 안에서 JSON 요청(GET, POST, DELETE)에 대한 처리를 도와주는 Helper function을 만든다.
export default function withHandler({
  methods,
  isPrivate = true,
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    // 로그인한 유저만 호출할 수 있게 설정
    // if (isPrivate && !req.session.user) {
    //   return res.status(401).json({ ok: false, error: "로그인 해주세요." });
    // }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
