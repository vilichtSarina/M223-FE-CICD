import api from "../config/Api";

import { UpdatePostDto } from "../types/models/Post.model";

const PostService = {
  getAllPosts: () => {
    return api.get(`/api/images`);
  },

  getPaginationPosts: (page: number, pageLength: number) => {
    return api.get(`/api/images?page=${page}&page-len=${pageLength}`);
  },

  getPostByUserId: (id: string) => {
    return api.get(`/api/images/author/${id}`);
  },

  createPost: (post: UpdatePostDto) => {
    return api.post("/api/images", post);
  },

  likePost: (postId: string) => {
    return api.put(`/api/images/like/${postId}`);
  },

  updatePost: (post: UpdatePostDto) => {
    return api.put(`/api/images/${post.id}`, post);
  },

  deletePost: (id: string) => {
    return api.delete(`/api/images/${id}`);
  },
};

export default PostService;
