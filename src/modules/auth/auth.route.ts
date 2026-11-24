import { Router } from "express";
import { authCrontroller } from "./auth.controller.js";

const route = Router();
// api/v1/auth/login
route.post("/login", authCrontroller.authLoginUser);

export const authRouter = route;
