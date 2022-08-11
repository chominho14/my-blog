import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    if (req.session.user) {
      const profile = await client.user.findUnique({
        where: { id: req.session.user?.id },
      });
      res.json({
        ok: true,
        profile,
      });
    } else {
      res.json({
        ok: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false });
  }
}

// withHandler를 사용함으로써 우리의 api 파일을 사용자가 볼 수 없게 만들어 준다.
export default withApiSession(withHandler({ methods: ["GET"], handler }));
