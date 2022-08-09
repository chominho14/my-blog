import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;
  if (id !== undefined) {
    const post = await client.post.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        answers: {
          select: {
            answer: true,
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            answers: true,
            wondering: true,
          },
        },
      },
    });
    if (!post) {
      res.status(404).json({ ok: false, error: "게시글을 찾을 수 없습니다." });
    }
    res.json({
      ok: true,
      post,
    });
  }
}

// withHandler를 사용함으로써 우리의 api 파일을 사용자가 볼 수 없게 만들어 준다.
export default withApiSession(withHandler({ methods: ["GET"], handler }));
