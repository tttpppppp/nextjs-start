import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";

class UsersService {
  async createUser({ email, password }: { email: string; password: string }) {
    const createUser = addDoc(collection(db, "users"), { email, password });
    return createUser;
  }
}

export const usersService = new UsersService();
