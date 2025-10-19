"use client";

import { UseFormReturn } from "react-hook-form";
import { Container, TextField, Button, Box, Typography, Avatar, Chip } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import { PhotoCamera } from "@mui/icons-material";
import { useState } from "react";
import type { ProfileSchema } from "@/features/profile/types";

type ProfileFormProps = {
  methods: UseFormReturn<ProfileSchema>;
  onSubmit: (data: ProfileSchema) => void;
};

// 得意料理のジャンルを固定値で設定
const GENRE_OPTIONS = ["和食", "洋食", "中華", "イタリアン", "フレンチ", "エスニック", "その他"];

export const ProfileForm = ({ methods, onSubmit }: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods;
  const [imagePreview, setImagePreview] = useState<string>("");
  const selectedGenres = watch("specialtyGenres") || [];

  const handleGenreToggle = (genre: string) => {
    const current = selectedGenres;
    if (current.includes(genre)) {
      setValue(
        "specialtyGenres",
        current.filter((g) => g !== genre)
      );
    } else {
      setValue("specialtyGenres", [...current, genre]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          プロフィール登録
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, justifyContent: "center" }}>
          <Avatar src={imagePreview} sx={{ width: 80, height: 80, mr: 2 }} />
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
            sx={{
              backgroundColor: orange[500],
              color: grey[800],
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: orange[600],
              },
            }}
          >
            画像を選択
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
        </Box>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="ユーザー名"
          autoFocus
          {...register("userName")}
          error={!!errors.userName}
          helperText={errors.userName?.message}
        />
        <Box sx={{ mt: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            得意料理ジャンル
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {GENRE_OPTIONS.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                clickable
                sx={{
                  backgroundColor: selectedGenres.includes(genre) ? orange[500] : "default",
                  color: selectedGenres.includes(genre) ? grey[800] : "default",
                  fontWeight: selectedGenres.includes(genre) ? "bold" : "normal",
                }}
                onClick={() => handleGenreToggle(genre)}
              />
            ))}
          </Box>
          {errors.specialtyGenres && (
            <Typography color="error" variant="caption" sx={{ mt: 1, display: "block" }}>
              {errors.specialtyGenres.message}
            </Typography>
          )}
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            py: 1.5,
            backgroundColor: orange[500],
            color: grey[800],
            fontSize: "1.1rem",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: orange[600],
            },
          }}
        >
          登録する
        </Button>
      </Box>
    </Container>
  );
};
