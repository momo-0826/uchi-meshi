"use client";

import { Button, TextField, Typography } from "@mui/material";
import { FormProvider, UseFormReturn } from "react-hook-form";

import type { SignUpSchema } from "@/features/auth/types";

type Props = {
  methods: UseFormReturn<SignUpSchema>;
  onSubmit: (data: SignUpSchema) => void;
};

export const SignUpForm = ({ methods, onSubmit }: Props) => {
  // const methods = useForm<SignUpSchema>()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Typography variant="h4">Sign Up</Typography>
        <TextField
          label="Email"
          type="email"
          {...methods.register("email")}
          error={!!methods.formState.errors.email}
          helperText={methods.formState.errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...methods.register("password")}
          error={!!methods.formState.errors.password}
          helperText={methods.formState.errors.password?.message}
        />
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </form>
    </FormProvider>
  );
};
