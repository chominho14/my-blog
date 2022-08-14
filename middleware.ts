// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  //   if (req.nextUrl.pathname.startsWith("/login")) {
  //     return NextResponse.rewrite(new URL("/", req.url));
  //   }
  //   if (req.nextUrl.pathname.startsWith("/join")) {
  //     return NextResponse.rewrite(new URL("/join", req.url));
  //   }
  //   try {
  //     if (req.url.includes("/api")) {
  //       return NextResponse.rewrite(new URL(`${req.nextUrl.origin}/`, req.url));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   console.log(req.headers.get("authorization"));
  //   if (req.url.includes("/api/")) {
  //     if (req.nextUrl.pathname.startsWith("/login")) {
  //       return NextResponse.rewrite(new URL("/", req.url));
  //     }
  //   }
  //   console.log(req.url);
  // 흠...쿠키를 get으로 가져와서 확인
  //   let verify = req.cookies.get("skillblogsession");
  //   let url = req.url;
  //   if (verify) {
  //     return NextResponse.rewrite(new URL("/", url));
  //   }
  //   console.log("req : ", req);
  //   console.log("당신은 Bot입니까 : ", req.ua?.isBot);
  //   console.log("req.page : ", req.page);
  //   if (req.ua?.isBot) {
  //     return new Response("Bot으로 접속하지 말아주세요.", { status: 403 });
  //   }
}
