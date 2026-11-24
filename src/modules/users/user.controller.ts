import type { Request, Response } from "express";

import { userService } from "./user.service.js";

const createUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const result = await userService.createUserIntoDB(req.body);
    // console.log(result);

    res.status(201).json({
      success: true,
      message: "User Created Sussessfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: "User retrived Sussessfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.getSingleUserFromDB(id as string);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
        // data: result.rows[0],
      });
    }
    res.status(200).json({
      success: true,
      message: "User retrived Sussessfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userService.updateSingleUserIntoDB(
      id as string,
      req.body,
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
        // data: result.rows[0],
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrived Sussessfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await userService.deleteSingleUserFromDB(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
        // data: result.rows[0],
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted Sussessfully",
      // data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
