import type { Request, Response } from "express";
import { authService } from "./auth.service.js";

const authLoginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);

    res.status(200).json({
      success: true,
      message: "User Login Sussessfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

export const authCrontroller = {
  authLoginUser,
};
