import { NextApiRequest, NextApiResponse } from "next";

// 백엔드 안에서 JSON 요청(GET, POST, DELETE)에 대한 처리를 도와주는 Helper function을 만든다.
export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
