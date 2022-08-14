import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { question },
    session: { user },
  } = req;
  if (req.method === "POST") {
    const post = await client.post.create({
      data: {
        question,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    if (!post) {
      res.status(404).json({ ok: false, error: "게시글을 만들 수 없습니다." });
    }

    await res.revalidate("/community");

    res.json({
      ok: true,
      post,
    });
  }
  if (req.method === "GET") {
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            avatar: true,
            name: true,
          },
        },
        _count: {
          select: {
            wondering: true,
            answers: true,
          },
        },
      },
    });
    if (!posts) {
      res.status(404).json({ ok: false, error: "게시글을 만들 수 없습니다." });
    }
    res.json({
      ok: true,
      posts,
    });
  }
}

// withHandler를 사용함으로써 우리의 api 파일을 사용자가 볼 수 없게 만들어 준다.
export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
