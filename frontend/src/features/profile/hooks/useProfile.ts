import { createClient } from "@/lib/supabase/client";
import { type ProfileSchema, type ProfileResponse } from "@/features/profile/types";

export const useProfile = () => {
  const supabase = createClient();

  const createProfile = async (input: ProfileSchema) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (!user || userError) {
        console.log("ユーザー情報の取得に失敗しました", userError);
        alert("ユーザー情報が取得できませんでした。");
        return;
      }

      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("userName", input.userName);
      formData.append("specialtyGenres", JSON.stringify(input.specialtyGenres));

      if (input.image) {
        formData.append("image", input.image);
      }

      const response = await fetch("/api/profiles", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result: ProfileResponse = await response.json();
        console.log("プロフィール登録成功:", result);
        return result.profile;
      } else {
        const errorData = await response.json();
        console.error("プロフィール登録失敗:", errorData);
        alert(`ロフィール登録に失敗しました: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.log("APIリクエストでエラーが発生しました。", error);
      alert("ネットワークエラーが発生しました。後でもう一度お試しください。");
    }
  };

  return { createProfile };
};
