import { ResponseData } from "@/types/ResponseType";
import { Http } from "@/lib/http";
import {
  LoginBodyType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";

const registerAccount = async (data: RegisterBodyType) => {
  return await Http.post<ResponseData<string>>("/auth/register", data);
};
const loginAccount = async (data: LoginBodyType) => {
  return await Http.post<ResponseData<string>>("/auth/login", data);
};

export { registerAccount, loginAccount };
