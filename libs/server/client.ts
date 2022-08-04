// PrismaClient를 만든다.
// 이것을 import해서 자동 완성 기능을 가진 PrismaClient로 데이터베이스에 대화를 걸도록 만든다
import { PrismaClient } from "@prisma/client";

// db에 직접 접근할 수 있는 파일을 프론트엔드인 브라우저에 추가하면 오류가 난다.
// 이것을 위해 Api route에 작성한다

declare global {
  var client: PrismaClient | undefined;
}

// NextJS는 hot Reload를 한다.
// 그럴대마다 Prisma client가 계속 생긴다고 받아들인다.
// 그것을 막기위해 코드 수정
const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
