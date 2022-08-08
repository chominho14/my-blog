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
    const alreadyExists = await client.fav.findFirst({
      where: {
        algorithmId: +id,
        userId: user?.id,
      },
    });
    if (alreadyExists) {
      // 좋아요 삭제
      await client.fav.delete({
        where: {
          id: alreadyExists.id,
        },
      });
    } else {
      // 좋아요 생성
      await client.fav.create({
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
        },
      });
    }
    res.json({ ok: true });
  }
}

// withHandler를 사용함으로써 우리의 api 파일을 사용자가 볼 수 없게 만들어 준다.
export default withApiSession(withHandler({ methods: ["POST"], handler }));
