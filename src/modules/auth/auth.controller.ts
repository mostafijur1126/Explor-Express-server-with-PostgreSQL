import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";

const authLoginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);

    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: false, //! http -> false, https -> true / In Production -> true
      httpOnly: true, //* Prevent XSS attack
      sameSite: "lax", //* "name", "strict", "lax" -> CSRF atack prevent
      //maxAge
      path: "/",
      domain: "localhost", //! .example.com
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Login Sussessfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

const genarateToken = async (req: Request, res: Response) => {
  try {
    const result = await authService.generateToken(req.cookies.refreshToken);

    res.status(200).json({
      success: true,
      message: "Access token generated Sussessfully",
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
  genarateToken,
};
