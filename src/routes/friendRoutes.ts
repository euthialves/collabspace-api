import { authentication } from "src/middlewares/authentication";
import { CreateCommentController } from "@modules/comments/useCases/createComment/createCommentController";
import { Router } from "express";

const friendRoutes = Router();

friendRoutes.use(authentication);
friendRoutes.post("/:targetId", new CreateCommentController().handle);

export { friendRoutes };
