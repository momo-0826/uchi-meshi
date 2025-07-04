import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email("メールアドレスの形式で入力してください。"),
  password: z.string().min(8, "8文字以上で入力してください。"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
