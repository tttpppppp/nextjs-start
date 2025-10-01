import { db } from "@/config/firebase";
import { RegisterBodyType } from "@/schemaValidations/auth.schema";
import { addDoc, collection } from "firebase/firestore";

class UsersService {
  async createUser(body: RegisterBodyType) {
    const createUser = addDoc(collection(db, "users"), body);
    return createUser;
  }
}

export const usersService = new UsersService();
