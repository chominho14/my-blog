import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
    body: { skillAnswer },
  } = req;

  if (id !== undefined) {
    const newAnswer = await client.skillAnswer.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        algorithm: {
          connect: {
            id: +id,
          },
        },
        skillAnswer,
      },
    });
    if (!newAnswer) {
      res.status(404).json({ ok: false, error: "댓글을 작성할 수 없습니다." });
    }
    res.json({
      ok: true,
      newAnswer,
    });
  }
}

// withHandler를 사용함으로써 우리의 api 파일을 사용자가 볼 수 없게 만들어 준다.
export default withApiSession(withHandler({ methods: ["POST"], handler }));
