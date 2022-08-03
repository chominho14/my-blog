import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "../../../libs/server/withHandler";
import bcrypt from "bcryptjs";
import { withIronSessionApiRoute } from "iron-session/next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    try {
      const {
        body: { email, password },
      } = req;
      const user = await client.user.findUnique({ where: { email } });
      if (!user) {
        return res.json({ ok: false, error: "유저를 찾을 수 없습니다." });
      }

      const passwordOK = await bcrypt.compare(password, user.password);
      if (!passwordOK) {
        return res.json({ ok: false, error: "비밀번호가 틀렸습니다." });
      }
      req.session.user = {
        id: user.id,
      };

      await req.session.save();

      return res.json({ ok: true });
    } catch (error) {
      console.error(error);
      return res.json({
        ok: false,
        error: "로그인 에러",
      });
    }
  }
}

// withHandler를 사용함으로써 우리의 api 파일을 사용자가 볼 수 없게 만들어 준다.
export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "skillblogsession",
  password:
    "1231231afsefasefsaefsefsefasefasef23123123123123123123123123123123123123",
});
