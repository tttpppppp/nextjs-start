import { Http } from "@/lib/http";
import {
  LoginBodyType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";

const registerAccount = async (data: RegisterBodyType) => {
  return await Http.post("/auth/register", data);
};
const loginAccount = async (data: LoginBodyType) => {
  return await Http.post("/auth/login", data);
};
export { registerAccount, loginAccount };
