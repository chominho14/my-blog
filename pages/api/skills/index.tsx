import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const skills = await client.algorithm.findMany({});
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
