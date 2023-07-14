// inversão de dependencia
import { IPostsRepositories } from "@modules/posts/iRepositories/IPostsRepositories";
import "./providers";

import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { UserRepository } from "@modules/users/repositories/UserRepository";
import { container } from "tsyringe";
import { PostRepository } from "@modules/posts/repositories/PostRepository";
import { ICommentRepositories } from "@modules/comments/IRepositories/ICommentesRepositories";
import { CommentRepository } from "@modules/comments/repositories/CommentRepository";

container.registerSingleton<IUsersRepositories>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IPostsRepositories>(
  "PostRepository",
  PostRepository
);

container.registerSingleton<ICommentRepositories>(
  "CommentRepository",
  CommentRepository
);
