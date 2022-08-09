import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const skills = await client.algorithm.findMany({
      include: {
        // _count 를 이용하면 좋아요의 갯수만 가져올 수 있다.
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });
    if (!skills) {
      res.status(404).json({ ok: false, error: "게시글을 찾을 수 없습니다." });
    }
    res.json({
      ok: true,
      skills,
    });
  }
  if (req.method === "POST") {
    const {
      body: { title, subtitle, explanation },
      session: { user },
    } = req;
    const skills = await client.algorithm.create({
      data: {
        title,
        subtitle,
        explanation,
        image: "xx",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    if (!skills) {
      res.status(404).json({ ok: false, error: "게시글을 만들 수 없습니다." });
    }
    res.json({
      ok: true,
      skills,
    });
  }
}

// withHandler를 사용함으로써 우리의 api 파일을 사용자가 볼 수 없게 만들어 준다.
export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
