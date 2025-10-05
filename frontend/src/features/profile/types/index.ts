import { z } from "zod";

export const profileSchema = z.object({
  userName: z.string().min(1, { message: "ユーザー名を入力してください" }),
  image: z.instanceof(File).optional(),
  specialtyGenres: z.array(z.string()).min(1, { message: "好きなジャンルを1つ以上選択してください" }),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

export type Profile = {
  userId: string;
  userName: string;
  image: string;
  specialtyGenres: string[];
};

export type ProfileResponse = {
  message?: string;
  profile: Profile;
};
