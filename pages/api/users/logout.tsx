import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    try {
      req.session.destroy();
      return res.json({ ok: true });
    } catch (error) {
      console.log(error);
      return res.json({ ok: false, error: "로그아웃 에러" });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
