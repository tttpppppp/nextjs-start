import { loginAccount, registerAccount } from "@/apiRequest/user.api";
import {
  LoginBodyType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: LoginBodyType) => loginAccount(data),
  });
};
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: RegisterBodyType) => registerAccount(data),
  });
};
