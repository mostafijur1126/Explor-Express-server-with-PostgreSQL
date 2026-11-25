import type { NextFunction, Request, Response } from "express";
import config from "../config/index.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { pool } from "../db/index.js";
import type { Role } from "../types/index.js";

const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //* Check if the token exist
    //* Verify token
    //* Check if the user exist
    //* is the user status active

    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(404).json({
          success: false,
          message: "Unauthorized access!",
        });
      }

      const decode = jwt.verify(
        token as string,
        config.jwt_secrete,
      ) as JwtPayload;

      const user = await pool.query(
        `
    SELECT * FROM users WHERE email=$1
    `,
        [decode.email],
      );

      if (user.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });
      }
      if (!user.rows[0].is_active) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!",
        });
      }

      if (roles.length && !roles.includes(user.rows[0].role)) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized access!",
        });
      }

      req.user = decode;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
