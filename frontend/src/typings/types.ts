export interface User {
  id?: number;
  name: string;
  email: string;
  asset_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Post {
  id?: number;
  caption: string;
  photo_url?: string;
  users_id: number;
  status: PostStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comment {
  id?: number;
  users_id: number;
  postsId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Reply {
  id?: number;
  users_id: number;
  commentsId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Share {
  id?: number;
  users_id: number;
  postsId: number;
  caption?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Like {
  id?: number;
  users_id: number;
  postsId: number;
  isLike: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface FriendRequest {
  id?: number;
  senderId: number;
  receiverId: number;
  status: FriendRequestStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum FriendRequestStatus {
  pending = "pending",
  accepted = "accepted",
  rejected = "rejected",
}

export enum PostStatus {
  public = "public",
  friends = "friends",
}
