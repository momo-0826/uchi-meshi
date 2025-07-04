"use client";

import { Box, Button, CardContent, Container, TextField, Typography, Stack, Paper } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import { FormProvider, UseFormReturn } from "react-hook-form";

import type { SignUpSchema } from "@/features/auth/types";

type Props = {
  methods: UseFormReturn<SignUpSchema>;
  onSubmit: (data: SignUpSchema) => void;
};

export const SignUpForm = ({ methods, onSubmit }: Props) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper elevation={3} sx={{ width: "100%", maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                <Stack spacing={3}>
                  <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: "bold", color: orange[500] }}>
                    新規登録
                  </Typography>

                  <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 2 }}>
                    アカウントを作成してください
                  </Typography>

                  <TextField
                    fullWidth
                    label="メールアドレス"
                    type="email"
                    variant="outlined"
                    {...methods.register("email")}
                    error={!!methods.formState.errors.email}
                    helperText={methods.formState.errors.email?.message}
                    sx={{
                      mb: 2,
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: orange[500],
                        },
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: orange[500],
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="パスワード"
                    type="password"
                    variant="outlined"
                    {...methods.register("password")}
                    error={!!methods.formState.errors.password}
                    helperText={methods.formState.errors.password?.message}
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: orange[500],
                        },
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: orange[500],
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      py: 1.5,
                      color: grey[800],
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      borderRadius: 2,
                      backgroundColor: orange[500],
                    }}
                  >
                    アカウントを作成
                  </Button>
                </Stack>
              </form>
            </FormProvider>
          </CardContent>
        </Paper>
      </Box>
    </Container>
  );
};
