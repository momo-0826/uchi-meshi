"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { profileSchema, type ProfileSchema } from "@/features/profile/types";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { ProfileForm } from "./ProfileForm";

export const ProfileContainer = () => {
  const methods = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });
  const { createProfile } = useProfile();

  const onSubmit = async (input: ProfileSchema) => {
    await createProfile(input);
  };

  return <ProfileForm methods={methods} onSubmit={onSubmit} />;
};
