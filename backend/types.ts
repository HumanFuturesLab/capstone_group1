import { UUID } from "crypto";

export type User = {
  id: UUID;
  name: string;
  accessToken: string;
  address: string;
  email: string;
  pointsCached: number;
  followers: number;
  companyID: UUID;
};

type Company = {
  id: UUID;
  companyName: string;
  email: string;
};

type Events = {
  eventID: UUID;
  eventDate: Date;
  pointReward: number;
  popMin: number;
  popMax: number;
  userID: UUID;
  location: string;
};

type Rewards = {
  rewardID: UUID;
  pointCost: number;
  companyID: UUID;
  numAvailable: number;
};

type Orders = {
  userID: UUID;
  rewardID: UUID;
  orderDate: Date;
};

type Signups = {
  userID: UUID;
  eventID: UUID;
  attended: boolean;
};

type Posts = {
  postID: UUID;
  userID: UUID;
  caption: string;
  datePosted: Date;
  likes: number;
  comments: number;
};

type Likes = {
  postID: UUID;
  userID: UUID;
};

type Comments = {
  commentID: UUID;
  body: string;
  datePosted: Date;
  userID: UUID;
  postID: UUID;
};

export type JWTPayload = {
  name?: string;
  email?: string;
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  roles?: string[];
};
