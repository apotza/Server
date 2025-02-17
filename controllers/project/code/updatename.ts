import { Request, Response } from "express";
import asyncHandler from "../../../helper/asyncHandler";
import ApiResponse from "../../../helper/ApiResponse";
import CodeBlockService from "../../../service/codeblock.service";

export const updateCodeBlockName = asyncHandler(
  async (req: Request, res: Response) => {
    const codeBlockId = req.params.id;
    const name = req.body.name;
    console.log(req.body);
    if (!codeBlockId) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "CodeBlock Not given with Params..."));
    }
    if (!name) {
      return res
        .status(400)
        .json(new ApiResponse(400, {}, "CodeBlock name not given"));
    }
    const codeBlock = await CodeBlockService.updateName(codeBlockId, name);
    if (!codeBlock) {
      return res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "CodeBlock could not be updated \n Server Error"
          )
        );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, codeBlock, "CodeBlock Updated"));
  }
);
