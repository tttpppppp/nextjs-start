import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { JWTPayload, jwtVerify } from "jose";
if (!process.env.SECRET_KEY) throw new Error("Missing SECRET_KEY");
const SECRET_KEY: Secret = process.env.SECRET_KEY;

export const signJwt = (payload: object, options?: SignOptions): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "10s", ...options });
};

// export const verifyJwt = (token: string) => {
//   try {
//     return jwt.verify(token, SECRET_KEY);
//   } catch (err) {
//     console.log("JWT verify error:", err);
//     return null;
//   }
// };

const encoder = new TextEncoder();
const secret = encoder.encode(process.env.SECRET_KEY!);

export async function verifyJwtEdge(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}
