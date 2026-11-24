import bcrypt from "bcryptjs";
import { pool } from "../../db/index.js";
import Jwt from "jsonwebtoken";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  // check if the user exist
  // check if the password match
  // check the user status
  // if pass all then generate jwt token
  const { email, password } = payload;

  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  //   console.log(user.rowCount);
  if (user.rowCount === 0) {
    throw new Error("Invalid credentials!");
  }

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!matchPassword) {
    throw new Error("Invalid credentials!");
  }
  if (!user.rows[0].is_active) {
    throw new Error("access denied!");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
  };

  const accessToken = Jwt.sign(jwtPayload, "dgdfgdfgjjds", { expiresIn: "1d" });

  return { accessToken, user: user.rows[0] };
};

export const authService = {
  loginUserIntoDB,
};
