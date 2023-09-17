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
  usersId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comment {
  id?: number;
  usersId: number;
  postsId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Reply {
  id?: number;
  usersId: number;
  commentsId: number;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Share {
  id?: number;
  usersId: number;
  postsId: number;
  caption?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Like {
  id?: number;
  usersId: number;
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
  pending,
  accepted,
  rejected,
}
