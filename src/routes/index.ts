import { Router } from "express";
import { userRoutes } from "./user.routes";
import { sessionRoutes } from "./session.routes";
import { postRoutes } from "./posts.routes";
import { commentRoutes } from "./commentRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

export { router };
