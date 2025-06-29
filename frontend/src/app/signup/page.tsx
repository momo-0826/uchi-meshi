"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { SignUpForm } from "@/features/auth/components/SignUpForm";
import { signUpSchema, type SignUpSchema } from "@/features/auth/types";
import { createClient } from "@/lib/supabase/client";

const SignUpPage = () => {
  const supabase = createClient();
  const methods = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    await supabase.auth.signUp(data);
  };

  return <SignUpForm />;
};

export default SignUpPage;
