import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import client from "@repo/db/client";
import { resultFormatter } from "../utils/resultFormatter";
import { SignupSchema, SigninSchema, UpdateMetaDataSchema } from "../types";
import jwt from "jsonwebtoken";
import { hash, compare } from "../bcrypt";

const login = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    resultFormatter.throw(parsedData.error.message, 400);
    return;
  }
  const user = await client.user.findUnique({
    where: {
      username: parsedData.data.username,
    },
  });

  if (!user) {
    resultFormatter.throw("User not found", 404);
    return;
  }

  const isPasswordValid = await compare(
    parsedData.data.password,
    user.password
  );
  if (!isPasswordValid) {
    resultFormatter.throw("Invalid password", 400);
    return;
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET!
  );

  resultFormatter.success(res, { token }, "User logged in successfully", 200);
});

const register = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = SignupSchema.safeParse(req.body);

  if (!parsedData.success) {
    resultFormatter.throw(parsedData.error.message, 400);
    return;
  }
  try {
    const hashedPassword = await hash(parsedData.data.password);
    const user = await client.user.create({
      data: {
        username: parsedData.data.username,
        password: hashedPassword,
        role: parsedData.data.role === "admin" ? "admin" : "user",
      },
    });

    resultFormatter.success(
      res,
      { userId: user.id },
      "User created successfully",
      201
    );
  } catch (error) {
    resultFormatter.throw("User already exists", 400);
  }
});

const updateMetadata = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req;
  const parsedData = UpdateMetaDataSchema.safeParse(req.body);
  if (!parsedData.success) {
    resultFormatter.throw(parsedData.error.message, 400);
    return;
  }

  const user = await client.user.update({
    where: {
      id: userId,
    },
    data: {
      avatarId: parsedData.data.avatarId,
    },
  });

  resultFormatter.success(
    res,
    { avatarId: user.avatarId },
    "User metadata updated successfully",
    200
  );
});

const getAvailableAvatars = asyncHandler(
  async (req: Request, res: Response) => {
    const avatars = await client.avatar.findMany();
    resultFormatter.success(
      res,
      {
        avatars: avatars.map((avatar) => ({
          id: avatar.id,
          imageUrl: avatar.thumbnail,
          name: avatar.name,
        })),
      },
      "Avatars fetched successfully",
      200
    );
  }
);

const getUsersMetadata = asyncHandler(async (req: Request, res: Response) => {
  const userIdsString = req.query.userIds as string;
  const userIds = userIdsString.slice(1, userIdsString?.length - 1).split(",");
  const metaData = await client.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      id: true,
      avatar: true,
    },
  });

  resultFormatter.success(
    res,
    {
      avatars: metaData.map((data) => ({
        id: data.id,
        imageUrl: data.avatar?.thumbnail,
      })),
    },
    "User metadata fetched successfully",
    200
  );
});

export {
  login,
  register,
  updateMetadata,
  getAvailableAvatars,
  getUsersMetadata,
};
