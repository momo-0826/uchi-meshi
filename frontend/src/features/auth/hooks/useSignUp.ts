import { type SignUpSchema } from "@/features/auth/types";
import { createClient } from "@/lib/supabase/client";

export const useSignUp = () => {
  const supabase = createClient();
  const signUp = async (input: SignUpSchema) => {
    try {
      // Supabaseに登録をする
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
      });
      if (signUpError) {
        console.log("Supabase登録エラー", signUpError);
        alert("Supabase登録に失敗しました。");
        return;
      }
      // Supabaseに登録したデータを取得する
      const userId = signUpData.user?.id;
      const email = signUpData.user?.email;
      if (!userId || !email) {
        console.error("SupabaseからユーザーIDまたはメールアドレスが取得できませんでした。");
        alert("ユーザー登録に失敗しました。再度お試しください。");
        return;
      }
      // バックエンドにリクエストを送信する
      const backendResponse = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, email }),
      });
      if (backendResponse.ok) {
        const result = await backendResponse.json();
        console.log("新規登録成功（Supabase & バックエンド）:", result);
        alert("新規登録が完了しました");
      } else {
        const errorData = await backendResponse.json();
        console.error("バックエンド保存失敗:", errorData);
        alert(`バックエンド保存に失敗しました: ${errorData.message || backendResponse.statusText}`);
      }
    } catch (error) {
      console.error("APIリクエストでエラーが発生しました。", error);
      alert("ネットワークエラーが発生しました。後でもう一度お試しください。");
    }
  };
  return { signUp };
};
