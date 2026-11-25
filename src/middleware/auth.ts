import type { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  //* Check if the token exist

  const token = req.headers.authorization;
  if (!token) {
    res.status(404).json({
      success: false,
      message: "Unauthorized access!",
    });
  }
  next();
};

export default auth;
