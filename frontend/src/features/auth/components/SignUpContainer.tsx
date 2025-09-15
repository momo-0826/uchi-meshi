import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SignUpForm } from "@/features/auth/components/SignUpForm";
import { signUpSchema, type SignUpSchema } from "@/features/auth/types";
import { useSignUp } from "@/features/auth/hooks/useSignUp";

const SignUpContainer = () => {
  const methods = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const { signUp } = useSignUp();

  const onSubmit = async (input: SignUpSchema) => {
    await signUp(input);
  };

  return <SignUpForm methods={methods} onSubmit={onSubmit} />;
};

export default SignUpContainer;
