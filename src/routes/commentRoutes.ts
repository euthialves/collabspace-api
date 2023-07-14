import { CreatCommentController } from "@modules/comments/useCases/creatCommment/createCommentControlle";
import { Router } from "express";
import { authentication } from "src/middlewares/authentication";

const commentRoutes = Router();

commentRoutes.use(authentication);

commentRoutes.post("/:id", new CreatCommentController().handle);

export { commentRoutes };
