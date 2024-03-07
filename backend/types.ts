import { UUID } from "crypto";

type Users = {
  id: UUID;
  name: string;
  password: string;
  address: string;
  email: string;
  points: number;
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
