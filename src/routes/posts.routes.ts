import { CreatePostController } from "@modules/posts/useCases/createPost/createPostUseController";
import { ListAllPostsController } from "@modules/posts/useCases/listAllPost/listAllPostsContoller";
import { Router } from "express";
import { authentication } from "src/middlewares/authentication";

const postRoutes = Router();
postRoutes.get("/", new ListAllPostsController().handle);

postRoutes.use(authentication);

postRoutes.post("/", new CreatePostController().handle);

export { postRoutes };
