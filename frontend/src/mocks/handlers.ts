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
    const formData = await request.formData();
    const userId = formData.get("userId");
    const userName = formData.get("userName");
    const image = formData.get("image") as File;
    const specialtyGenresStr = formData.get("specialtyGenres") as string;
    const specialtyGenres = JSON.parse(specialtyGenresStr);

    console.log("プロフィール登録リクエスト:", {
      userId,
      userName,
      image,
      specialtyGenres,
    });

    // モック用のS3のURLを生成
    const imageUrl = image ? `https://mock-s3.example.com/avatars/${userId}/${image.name}` : "";

    return HttpResponse.json(
      {
        message: "プロフィールが正常に登録されました",
        profile: {
          userId,
          userName,
          image: imageUrl,
          specialtyGenres,
        },
      },
      { status: 201 }
    );
  }),
];
