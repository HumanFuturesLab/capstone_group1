
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
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  description VARCHAR (255),
  eventDate date,
  pointReward int,
  popMin int,
  popMax int,
  userID uuid,
  location VARCHAR(255),
  FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE Rewards (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR (30),
  description VARCHAR (200),
  cost int,
  companyID uuid,
  numAvailable int,
  FOREIGN KEY (companyID) REFERENCES Company(id)
);

CREATE TABLE Orders (
  userID uuid,
  rewardID uuid,
  orderDate date,
  PRIMARY KEY (userID, rewardID),
  FOREIGN KEY (userID) REFERENCES Users(id),
  FOREIGN KEY (rewardID) REFERENCES Rewards(id)
);

CREATE TABLE Signups (
  userID uuid,
  eventID uuid,
  attended bool,
  PRIMARY KEY (userID, eventID),
  FOREIGN KEY (userID) REFERENCES Users(id),
  FOREIGN KEY (eventID) REFERENCES Events(id)
);

-- TODO: link posts table with likes and comments
CREATE TABLE Posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  FOREIGN KEY (postID) REFERENCES Posts(id),
  FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE Comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  body VARCHAR(255),
  datePosted date,
  userID uuid,
  postID uuid,
  FOREIGN KEY (postID) REFERENCES Posts(id),
  FOREIGN KEY (userID) REFERENCES Users(id)
);

-- Insert into Users
INSERT INTO Users (name, accessToken, address, email, pointsCached, followers)
VALUES ('John Doe', 'token12345', '1234 Main St', 'john.doe@example.com', 100, 20);
