interface IComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  commented_at: Date;
}
interface IRequestCreatComment {
  content: string;
}

interface ICreatComment {
  id: string;
  postId: string;
  userId: string;
  content: string;
}

export { IComment, ICreatComment, IRequestCreatComment };
