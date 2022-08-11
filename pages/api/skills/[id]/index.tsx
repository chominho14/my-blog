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
  } = req;
  if (id !== undefined) {
    const skill = await client.algorithm.findUnique({
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
        skillAnswers: {
          select: {
            skillAnswer: true,
            id: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          take: 10,
          skip: 10,
        },
        _count: {
          select: {
            skillAnswers: true,
            favs: true,
          },
        },
      },
    });
    if (!skill) {
      res.status(404).json({ ok: false, error: "게시글을 찾을 수 없습니다." });
    }
    const isLiked = Boolean(
      await client.fav.findFirst({
        where: {
          algorithmId: skill?.id,
          userId: user?.id,
        },
        select: {
          id: true,
        },
      })
    );
    if (!skill) {
      res.status(404).json({ ok: false, error: "게시글을 찾을 수 없습니다." });
    }
    res.json({ ok: true, isLiked, skill });
  }
}

// withHandler를 사용함으로써 우리의 api 파일을 사용자가 볼 수 없게 만들어 준다.
export default withApiSession(withHandler({ methods: ["GET"], handler }));
