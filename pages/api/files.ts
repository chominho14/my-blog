import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CF_IMAGE_API_TOKEN}`,
        },
      }
    )
  ).json();
  console.log(response);
  res.json({
    ok: true,
    ...response.result,
  });
}

// withHandler를 사용함으로써 우리의 api 파일을 사용자가 볼 수 없게 만들어 준다.
export default withApiSession(
  withHandler({ methods: ["GET"], handler, isPrivate: false })
);
