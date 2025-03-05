import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
import type { UserData } from "../auth/DTO/user.dto";

export interface AuthRequest extends Request {
  user?: JwtPayload & UserData; // Ensure `user` is a valid JWT payload
}
