import { CreatePostController } from "@modules/posts/useCases/createPost/createPostUseController";
import { DeletePostController } from "@modules/posts/useCases/deletePost/deletePostController";
import { ListAllPostsController } from "@modules/posts/useCases/listAllPost/listAllPostsContoller";
import { UpdatePostController } from "@modules/posts/useCases/updatePost/updatePostController";
import { Router } from "express";
import { authentication } from "src/middlewares/authentication";

const postRoutes = Router();
postRoutes.get("/", new ListAllPostsController().handle);

postRoutes.use(authentication);

postRoutes.post("/", new CreatePostController().handle);
postRoutes.put("/:id", new UpdatePostController().handle);
postRoutes.delete("/:id", new DeletePostController().handle);

export { postRoutes };
