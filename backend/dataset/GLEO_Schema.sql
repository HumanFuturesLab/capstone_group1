
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
  userID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nameFirst VARCHAR(30),
  nameLast VARCHAR(30),
  userName VARCHAR(30),
  accessToken VARCHAR(30),
  address VARCHAR(50),
  email VARCHAR(50), 
  points int,
  followers int
);

CREATE TABLE Company (
  companyID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  companyName VARCHAR(30),
  email VARCHAR(50)
);

CREATE TABLE CompanyUser (
  userID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nameFirst VARCHAR(30),
  nameLast VARCHAR(30),
  userName VARCHAR(30),
  password VARCHAR(30),
  address VARCHAR(50),
  email VARCHAR(50),
  companyID uuid,
  FOREIGN KEY (companyID) REFERENCES Company(companyID)
);

CREATE TABLE Admins (
  adminID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nameFirst VARCHAR(30),
  nameLast VARCHAR(30),
  username VARCHAR(30),
  password VARCHAR(30),
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
  adminID uuid,
  location VARCHAR(50),
  FOREIGN KEY (adminID) REFERENCES Admins(adminID)
);

CREATE TABLE Rewards (
  rewardID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  rewardName VARCHAR (30),
  rewardDesc VARCHAR (200),
  pointCost int,
  companyID uuid,
  numAvailable int,
  FOREIGN KEY (companyID) REFERENCES Company(companyID)
);

CREATE TABLE Orders (
  userID uuid,
  rewardID uuid,
  orderDate date,
  PRIMARY KEY (userID, rewardID),
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (rewardID) REFERENCES Rewards(rewardID)
);

CREATE TABLE Signups (
  userID uuid,
  eventID uuid,
  attended bool,
  PRIMARY KEY (userID, eventID),
  FOREIGN KEY (userID) REFERENCES Users(userID),
  FOREIGN KEY (eventID) REFERENCES Events(eventID)
);

CREATE TABLE Posts (
  postID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  userID uuid,
  caption VARCHAR(256),
  datePosted date,
  likes int,
  comments int,
  FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE Likes (
  postID uuid,
  userID uuid,
  PRIMARY KEY (postID, userID),
  FOREIGN KEY (postID) REFERENCES Posts(postID),
  FOREIGN KEY (userID) REFERENCES Users(userID)
);

CREATE TABLE Comments (
  commentID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  body VARCHAR(256),
  datePosted date,
  userID uuid,
  postID uuid,
  FOREIGN KEY (postID) REFERENCES Posts(postID),
  FOREIGN KEY (userID) REFERENCES Users(userID)
);


-- Inserting data into Users
INSERT INTO Users (nameFirst, nameLast, userName, accessToken, address, email,  points, followers)
VALUES ('John', 'Doe', 'johndoe', 'pass123', '123 Main St', 'john.doe@example.com', 100, 15);

INSERT INTO Users (nameFirst, nameLast, userName, accessToken, address, email, points, followers)
VALUES ('Jane', 'Smith', 'janesmith', 'password', '456 Elm St', 'jane.smith@example.com', 150, 20);

-- Inserting data into Company
INSERT INTO Company (companyName, email)
VALUES ('Acme Corporation', 'contact@acmecorp.com');

INSERT INTO Company (companyName, email)
VALUES ('Globex Corporation', 'info@globexcorp.com');

-- Inserting data into CompanyUser (assuming the companyID for Acme Corporation is known or fetched)
-- Example of fetching companyID (replace 'Acme Corporation' with actual name if different)
INSERT INTO CompanyUser (nameFirst, nameLast, userName, password, address, email, companyID)
VALUES ('Alice', 'Johnson', 'alicej', 'alicepass', '789 Pine St', 'alice.johnson@example.com', 
(SELECT companyID FROM Company WHERE companyName = 'Acme Corporation'));

-- Inserting data into Admins
INSERT INTO Admins (nameFirst, nameLast, username, password, email)
VALUES ('Mark', 'Zuckerberg', 'markz', 'admin123', 'mark.zuckerberg@example.com');

-- Inserting data into Events (assuming adminID is known or fetched)
-- Example of fetching adminID
INSERT INTO Events (eventName, eventDesc, eventDate, pointReward, popMin, popMax, adminID, location)
VALUES ('Cleanup', 'Cleaning trash', '2023-11-15', 50, 100, 500, (SELECT adminID FROM Admins WHERE username = 'markz'), 'Central Park');

-- Inserting data into Posts (assuming userID is known or fetched)
-- Example of fetching userID for 'John Doe'
INSERT INTO Posts (userID, caption, datePosted, likes, comments)
VALUES ((SELECT userID FROM Users WHERE userName = 'johndoe'), 'Enjoying the sunny weather!', '2023-07-04', 100, 5);


-- Inserting data into Rewards (assuming companyID is known or fetched)
-- Example of fetching companyID for 'Globex Corporation'
INSERT INTO Rewards (rewardName, rewardDesc, pointCost, companyID, numAvailable)
VALUES ('Reward 1', 'Reward 1 Desc', 200, (SELECT companyID FROM Company WHERE companyName = 'Globex Corporation'), 10);

INSERT INTO Rewards (rewardName, rewardDesc, pointCost, companyID, numAvailable)
VALUES ('Reward 2', 'Reward 2 Desc', 150, (SELECT companyID FROM Company WHERE companyName = 'Acme Corporation'), 20);

-- Inserting data into Orders (assuming userID and rewardID are known or fetched)
-- Example of fetching userID and rewardID
INSERT INTO Orders (userID, rewardID, orderDate)
VALUES (
    (SELECT userID FROM Users WHERE userName = 'johndoe'), 
    (SELECT rewardID FROM Rewards WHERE pointCost = 200), 
    '2023-08-01'
);

-- Inserting data into Signups (assuming userID and eventID are known or fetched)
-- Example of fetching userID and eventID
INSERT INTO Signups (userID, eventID, attended)
VALUES (
    (SELECT userID FROM Users WHERE userName = 'janesmith'), 
    (SELECT eventID FROM Events WHERE location = 'Central Park'), 
    true
);

-- Inserting data into Likes (assuming postID and userID are known or fetched)
-- Example of fetching postID and userID
INSERT INTO Likes (postID, userID)
VALUES (
    (SELECT postID FROM Posts WHERE caption = 'Enjoying the sunny weather!'), 
    (SELECT userID FROM Users WHERE userName = 'janesmith')
);

-- Inserting data into Comments (assuming userID and postID are known or fetched)
-- Example of fetching userID and postID
INSERT INTO Comments (body, datePosted, userID, postID)
VALUES (
    'Great photo!', 
    '2023-07-05', 
    (SELECT userID FROM Users WHERE userName = 'janesmith'), 
    (SELECT postID FROM Posts WHERE caption = 'Enjoying the sunny weather!')
);
