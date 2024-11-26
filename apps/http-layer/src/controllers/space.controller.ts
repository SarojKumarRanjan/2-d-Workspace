import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import client from "@repo/db/client";
import { CreateSpaceSchema,AddElementSchema } from "../types";
import { resultFormatter } from "../utils/resultFormatter";

const createSpace = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = CreateSpaceSchema.safeParse(req.body);

  if (!parsedData.success) {
    resultFormatter.throw(parsedData.error.message, 400);
    return;
  }

  if (!parsedData.data.mapId) {
    const spaceCreated = await client.space.create({
      data: {
        name: parsedData.data.name,
        createrId: req.userId as string,
        height: parseInt(parsedData.data.dimensions.split("x")[0]),
        width: parseInt(parsedData.data.dimensions.split("x")[1]),
      },
    });

    resultFormatter.success(
      res,
      {
        spaceId: spaceCreated.id,
      },
      "space created successfully",
      201
    );
    return;
  }

  const map = await client.map.findUnique({
    where: {
      id: parsedData.data.mapId,
    },
    select: {
      elements: true,
      height: true,
      width: true,
    },
  });

  if (!map) {
    resultFormatter.throw("map not found", 404);
    return;
  }

  let space = await client.$transaction(async () => {
    const space = await client.space.create({
      data: {
        name: parsedData.data.name,
        width: map.width,
        height: map.height,
        createrId: req.userId!,
      },
    });

    await client.spaceElements.createMany({
      data: map.elements
        .filter((e) => e.elementId !== null)
        .map((e) => ({
          spaceId: space.id,
          elementId: e.elementId!,
          x: e.x!,
          y: e.y!,
        })),
    });

    return space;
  });

  resultFormatter.success(
    res,
    {
      spaceId: space.id,
    },
    "space created successfully",
    201
  );
  return;
});

const deleteSpace = asyncHandler(async (req: Request, res: Response) => {
    const spaceId = req.params.spaceId;

    const space = await client.space.findUnique({
        where: {
            id: spaceId
        },
        select: {
            createrId: true
        }
    })

    if(!space){
        resultFormatter.throw("space not found",400)
        return;
    }

    if(space.createrId !== req.userId){
        resultFormatter.throw("you are not authorized to delete this space", 403);
        return;
    }

   const deleteSpace =  await client.space.delete({
        where: {
            id: spaceId
        }
    })
    if(!deleteSpace){
        resultFormatter.throw("space not found", 404);
        return;
    }
    resultFormatter.success(res, {}, "space deleted successfully", 200);
});

const getMyExistingSpaces = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.userId;
    const spaces = await client.space.findMany({
      where: {
        createrId: userId,
      },
    });

    if (!spaces) {
      resultFormatter.throw("spaces not found", 404);
      return;
    }

    resultFormatter.success(
      res,
      {
        spaces:spaces.map((s) =>({
           id:s.id,
           thumbnail:s.thumbnail,
           name:s.name,
           dimensions:`${s.height}x${s.width}`
        })),
      },
      "spaces fetched successfully",
      200
    );
  }
);

const getSpace = asyncHandler(async (req: Request, res: Response) => {
  const spaceId = req.params.spaceId;

  if (!spaceId) {
    resultFormatter.throw("space id is required", 400);
    return;
  }

  
  const space = await client.space.findUnique({
    where: {
      id: spaceId,
    },
    include:{
      elements:{
        include:{
          element:true
        }
      }
    }
  });


  if (!space) {
    resultFormatter.throw("space not found", 400);
    return;
  }

  resultFormatter.success(
    res,
    {
      space: {
        id: space.id,
        dimensions: `${space.height}x${space.width}`,
        elements: space.elements.map((e) => ({
          id: e.id,
          element:{
            id:e.element.id,
            thumbnail:e.element.thumbnail,
            width:e.element.width,
            height:e.element.height,
            static:e.element.static
          },
          x: e.x,
          y: e.y,
          
        })),
      },
    },
    "space fetched successfully",
    200
  );

});

const addElement = asyncHandler(async (req: Request, res: Response) => {
  const parsedData = AddElementSchema.safeParse(req.body);

  if (!parsedData.success) {
    resultFormatter.throw(parsedData.error.message, 400);
    return;
  }

  const space = await client.space.findUnique({
    where: {
      id: parsedData.data.spaceId,
      createrId: req.userId,
    },
    select:{
      height:true,
      width:true
    }
  });

  if (req.body.x < 0 || req.body.y < 0 || req.body.x > space?.width! || req.body.y > space?.height!) {
    resultFormatter.throw("point is outside of the boundary", 400);
    return;
  }

  if (!space) {
    resultFormatter.throw("space not found", 404);
    return;
  }
  

  const spaceElement = await client.spaceElements.create({
    data:{
      spaceId:parsedData.data.spaceId,
      elementId:parsedData.data.elementId,
      x:parsedData.data.x,
      y:parsedData.data.y
    }
  })

  if (!spaceElement) {
    resultFormatter.throw("element not created", 404);
    return;
  }

  resultFormatter.success(res, { spaceElement }, "element added successfully", 201);
});

const deleteElement = asyncHandler(async (req: Request, res: Response) => {
  const elementId = req.body.elementId;

  if (!elementId) {
    resultFormatter.throw("element id is required", 400);
    return;
  }

  const spaceElement = await client.spaceElements.findUnique({
    where: {
      id: elementId,
    },
    include:{
      space:true
    }
  });

  if (!spaceElement) {
    resultFormatter.throw("element not found", 404);
    return;
  }

  


  if (!spaceElement?.space.createrId || spaceElement.space.createrId !== req.userId) {
    resultFormatter.throw("you are not authorized to delete this element", 403);
    return;
  }

  
  const deleteElement = await client.spaceElements.delete({
    where: {
      id: elementId,
    },
  });

  if (!deleteElement) {
    resultFormatter.throw("element not found", 404);
    return;
  }

  resultFormatter.success(res, {
    deleteElement,
  }, "element deleted successfully", 200);
  
});

const getAllElements = asyncHandler(async (req: Request, res: Response) => {
  const elements = await client.elements.findMany();

  if (!elements) {
    resultFormatter.throw("elements not found", 404);
    return;
  }

  resultFormatter.success(
    res,
    {
      elements: elements.map((e) => ({
        id: e.id,
        thumbnail: e.thumbnail,
        width: e.width,
        height: e.height,
        static: e.static,
      })),
    },
    "elements fetched successfully",
    200
  );
});

export {
  createSpace,
  deleteSpace,
  getMyExistingSpaces,
  getSpace,
  addElement,
  deleteElement,
  getAllElements,
};
