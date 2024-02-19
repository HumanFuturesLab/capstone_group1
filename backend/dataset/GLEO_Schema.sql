
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  accessToken VARCHAR(255),
  address VARCHAR(255),
  email VARCHAR(255),
  pointsCached int,
  followers int,
  companyID uuid
);

CREATE TABLE Company (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  companyName VARCHAR(30),
  email VARCHAR(50)
);

CREATE TABLE Admins (
  adminID uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  nameFirst VARCHAR(30),
  nameLast VARCHAR(30),
  username VARCHAR(30),
  email VARCHAR(255),
  accessToken VARCHAR(255)
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
  FOREIGN KEY (adminID) REFERENCES Admins(adminID)
  location VARCHAR(255),
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


-- Inserting data into Users
INSERT INTO Users (nameFirst, nameLast, userName, accessToken, address, email, pointsCached, followers)
VALUES ('John', 'Doe', 'johndoe', 'accessToken_user_John_Doe', '123 Main St', 'john.doe@example.com', 100, 15);

INSERT INTO Users (nameFirst, nameLast, userName, accessToken, address, email, pointsCached, followers)
VALUES ('Jane', 'Smith', 'janesmith', 'accessToken_user_Jane_Smith', '456 Elm St', 'jane.smith@example.com', 150, 20);

-- Inserting data into Company
INSERT INTO Company (companyName, email)
VALUES ('Acme Corporation', 'contact@acmecorp.com');

INSERT INTO Company (companyName, email)
VALUES ('Globex Corporation', 'info@globexcorp.com');

-- Inserting data into CompanyUser (assuming the companyID for Acme Corporation is known or fetched)
-- Example of fetching companyID (replace 'Acme Corporation' with actual name if different)
INSERT INTO CompanyUser (nameFirst, nameLast, userName, accessToken, address, email, companyID)
VALUES ('Alice', 'Johnson', 'alicej', 'accessToken_Company_user_Alice_Johnson', '789 Pine St', 'alice.johnson@example.com', 
(SELECT companyID FROM Company WHERE companyName = 'Acme Corporation'));

-- Inserting data into Admins
INSERT INTO Admins (nameFirst, nameLast, username, accessToken, email)
VALUES ('Mark', 'Zuckerberg', 'markz', 'accessToken_admin_Mark_Zuckerberg', 'mark.zuckerberg@example.com');

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
