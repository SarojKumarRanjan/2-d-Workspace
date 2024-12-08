import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import {
  CreateElementSchema,
  UpdateElementSchema,
  CreateAvatarSchema,
  CreateMapSchema,
} from "../types";
import { resultFormatter } from "../utils/resultFormatter";
import client from "@repo/db/client";

const createElement = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = CreateElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    resultFormatter.throw(parsedData.error.message, 400);
    return;
  }

  const elementCreated = await client.elements.create({
    data: {
      thumbnail: parsedData.data.thumbnail,
      static: parsedData.data.static,
      height: parsedData.data.height,
      width: parsedData.data.width,
    },
  });

  if (!elementCreated) {
    resultFormatter.throw("element not created", 400);
    return;
  }

  resultFormatter.success(
    res,
    {
      elementId: elementCreated.id,
    },
    "element created successfully",
    201
  );
});

const updateElement = asyncHandler(async (req: Request, res: Response) => {
  const elementId = req.params.elementId;

  const parsedData = UpdateElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    resultFormatter.throw(parsedData.error.message, 400);
    return;
  }

  const elementUpdated = await client.elements.update({
    where: {
      id: elementId,
    },
    data: {
      thumbnail: parsedData.data.thumbnail,
    },
  });

  if (!elementUpdated) {
    resultFormatter.throw("element not updated", 400);
    return;
  }

  resultFormatter.success(
    res,
    {
      elementId: elementUpdated.id,
    },
    "element updated successfully",
    201
  );
});

const createAvatar = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = CreateAvatarSchema.safeParse(req.body);

  if (!parsedData.success) {
    resultFormatter.throw(parsedData.error.message, 400);
    return;
  }

  const avatarCreated = await client.avatar.create({
    data: {
      thumbnail: parsedData.data.thumbnail,
      name: parsedData.data.name,
    },
  });

  if (!avatarCreated) {
    resultFormatter.throw("avatar not created", 400);
    return;
  }

  resultFormatter.success(
    res,
    {
      avatarId: avatarCreated.id,
    },
    "avatar created successfully",
    201
  );
});

const createMap = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = CreateMapSchema.safeParse(req.body);

  if (!parsedData.success) {
    resultFormatter.throw(parsedData.error.message, 400);
    return;
  }

  const mapCreated = await client.map.create({
    data: {
      name: parsedData.data.name,
      thumbnail: parsedData.data.thumbnail,
      height: parseInt(parsedData.data.dimensions.split("x")[0]),
      width: parseInt(parsedData.data.dimensions.split("x")[1]),
      elements: {
        create: parsedData.data.defaultElements.map((element) => {
          return {
            elementId: element.elementId,
            x: element.x,
            y: element.y,
          };
        }),
      },
    },
  });

  if (!mapCreated) {
    resultFormatter.throw("map not created", 400);
    return;
  }

    resultFormatter.success(
        res,
        {
        mapId: mapCreated.id,
        },
        "map created successfully",
        201
    );
});



export { createElement, updateElement, createAvatar, createMap };
