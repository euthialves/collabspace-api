import { CreatCommentController } from "@modules/comments/useCases/creatCommment/createCommentControlle";
import { UpdateCommentController } from "@modules/comments/useCases/updateComment/upadateCoomentcontroller";
import { Router } from "express";
import { authentication } from "src/middlewares/authentication";

const commentRoutes = Router();

commentRoutes.use(authentication);

commentRoutes.post("/:id", new CreatCommentController().handle);
commentRoutes.put("/:id", new UpdateCommentController().handle);

export { commentRoutes };
