import { http, HttpResponse } from "msw";

export const handlers = [
  // 新規登録APIのモックハンドラを追加
  http.post("/api/signup", async ({ request }) => {
    const userData = await request.json();
    console.log("新規登録リクエストデータ", userData);
    return new HttpResponse(JSON.stringify({ message: "新規登録リクエストが正常に処理されました" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  // ユーザープロフィールの登録APIのモックハンドラ
  http.post("/api/profiles", async ({ request }) => {
    const profile = await request.formData();
    console.log(profile);
    return new HttpResponse("Hello World!!", { status: 201 });
  }),
];
