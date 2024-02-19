
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  accessToken VARCHAR(255),
  address VARCHAR(255),
  email VARCHAR(255),
  pointsCached int,
  followers int,
  companyID uuid,
  isAdmin boolean DEFAULT false
);

CREATE TABLE Company (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  companyName VARCHAR(30),
  email VARCHAR(50)
);

CREATE TABLE Events (
  eventID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  eventName VARCHAR(30),
  eventDesc VARCHAR (200),
  eventDate date,
  pointReward int,
  popMin int,
  popMax int,
  userID uuid,
  location VARCHAR(255),
  FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE Rewards (
  rewardID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  rewardName VARCHAR (30),
  rewardDesc VARCHAR (200),
  pointCost int,
  companyID uuid,
  numAvailable int,
  FOREIGN KEY (companyID) REFERENCES Company(id)
);

CREATE TABLE Orders (
  userID uuid,
  rewardID uuid,
  orderDate date,
  PRIMARY KEY (userID, rewardID),
  FOREIGN KEY (rewardID) REFERENCES Rewards(rewardID)
  FOREIGN KEY (userID) REFERENCES Users(id),
);

CREATE TABLE Signups (
  userID uuid,
  eventID uuid,
  attended bool,
  PRIMARY KEY (userID, eventID),
  FOREIGN KEY (eventID) REFERENCES Events(eventID)
  FOREIGN KEY (userID) REFERENCES Users(id),
);

CREATE TABLE Posts (
  postID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  userID uuid,
  caption VARCHAR(255),
  datePosted date,
  likes int,
  comments int,
  FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE Likes (
  postID uuid,
  userID uuid,
  PRIMARY KEY (postID, userID),
  FOREIGN KEY (postID) REFERENCES Posts(postID),
  FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE Comments (
  commentID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  body VARCHAR(255),
  datePosted date,
  userID uuid,
  postID uuid,
  FOREIGN KEY (postID) REFERENCES Posts(postID),
  FOREIGN KEY (userID) REFERENCES Users(id)
);

