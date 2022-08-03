import client from "@libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../libs/server/withHandler";
import bcrypt from "bcryptjs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const {
        body: { name, email, password },
      } = req;
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ name }, { email }],
        },
      });
      if (existingUser) {
        return res.json({ ok: false, error: "유저가 이미 존재합니다." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      return res.json({ ok: true });
    } catch (error) {
      console.error(error);
      return res.json({
        ok: false,
        error: "계정을 만들 수 없습니다.",
      });
    }
  }
}

// withHandler를 사용함으로써 우리의 api 파일을 사용자가 볼 수 없게 만들어 준다.
export default withHandler("POST", handler);
