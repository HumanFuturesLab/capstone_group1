import express, { Request, Response } from "express";
import { Pool, Client } from "pg";
// import { UUID } from "bson";

// express app
const app = express();
app.use(express.json());

const startApi = async () => {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "gleo",
    password: "postgres",
    port: 5432,
  });

  const userExists = async (email: string) => {
    // need to give it a user type later
    let query = `SELECT * FROM users WHERE email=$1;`;
    let resp = (await client.query(query, [email])).rows[0]; // if there is a row in the resp
    return resp;
  };

  client.connect(async (err) => {
    if (err) {
      console.error("connection error", err.stack);
    } else {
      // connected now do stuff
      console.error("connected");

      function isValidObjectId(id: string): boolean {
        return false;
        // return UUID.isValid(id);
      }

      // Return data object of users
      app.get("/users", async (req, res) => {
        let x = await client.query("SELECT * FROM users;");
        res.json({ data: x["rows"] });
      });

      // create a user
      app.post("/users", async (req: Request, res: Response) => {
        const checkUser = await userExists(req.body.email);
        if (checkUser) {
          if (checkUser.accesstoken === req.body.accessToken) {
            res.json({ data: checkUser, error: "user exists" });
            return;
          }
          if (checkUser.accessToken !== req.body.accessToken) {
            res.json({ data: {}, error: "user exists" });
            return;
          }
        }

        let newUser = {
          nameFirst: req.body.name, // we can take the "name" from auth0
          nameLast: "", // a user can change this in the profile
          userName: req.body.name, // this can be the same as "nameFirst"
          accessToken: req.body.accessToken, // from auth0
          address: "", // user will set it in profile later
          email: req.body.email, // this will come from auth0
          pointsCached: 0,
          followers: 0,
        };

        let query = `INSERT INTO Users (nameFirst, nameLast, userName, accessToken, address, email, pointsCached, followers) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
        await client.query(query, [
          newUser.nameFirst,
          newUser.nameLast,
          newUser.userName,
          newUser.accessToken,
          newUser.address,
          newUser.email,
          newUser.pointsCached,
          newUser.followers,
        ]);

        res.json({ data: { newUser }, error: "" });
      });

      //Return array of rewards
      app.get("/rewards/:userID", async (req, res) => {
        let param = req.params.userID;

        if (!isValidObjectId(param)) {
          res.status(400);
          res.json({ data: "Invalid ID" });
          return;
        }

        let UsersJOINOrders = await client.query(
          `SELECT rewardID FROM Orders WHERE Orders.userID = '$1';`,
          [param]
        );
        // fix this later
        let OrdersJOINRewards = await client.query(
          "SELECT Rewards.pointcost FROM Rewards JOIN Orders ON Rewards.rewardID = '" +
            UsersJOINOrders["rows"][0]["rewardid"] +
            "';"
        );

        res.json(OrdersJOINRewards["rows"]);
      });

      app.get("/rewards", async (req, res) => {
        // if (!isValidObjectId(param)) {
        //   res.status(400);
        //   res.json({ data: "Invalid ID" });
        //   return;
        // }

        let allRewards = await client.query("SELECT * FROM rewards;");

        res.json({ data: allRewards["rows"] });
      });

      app.get("/posts/:id", async (req, res) => {
        let posts = await client.query(
          `SELECT * FROM Posts WHERE Posts.userID = '${req.params.id}'`
        );

        res.json({ data: posts.rows });
      });
      // incomplete
      app.get("/events/:id", async (req, res) => {
        let eventIDs = await client.query(
          `SELECT signups.eventID FROM signups WHERE signups.userID = $1`,
          [req.params.id]
        );

        let events = await client.query(`SELECT * FROM events WHERE `);
      });

      // get all events for display
      app.get("/events", async (req, res) => {
        let allEvents = await client.query("SELECT * FROM events;");
        res.json({ data: allEvents.rows });
      });

      app.post("/events", async (req, res) => {
        // Assuming you have middleware like app.use(express.json()) to parse JSON bodies
        const { eventDate, pointReward, popMin, popMax, adminID, location } =
          req.body;

        const query = `
          INSERT INTO Events(eventDate, pointReward, popMin, popMax, adminID, location) 
          VALUES($1, $2, $3, $4, $5, $6)
          RETURNING *;
        `;

        try {
          const result = await client.query(query, [
            eventDate,
            pointReward,
            popMin,
            popMax,
            adminID,
            location,
          ]);

          // Check if the insert was successful and return the newly created event
          if (result.rows && result.rows.length > 0) {
            res.status(201).json(result.rows[0]); // Send the inserted event back to the client
          } else {
            // Handle the case where no rows were returned
            res.status(500).send("Failed to create the event");
          }
        } catch (err: any) {
          console.error("Error executing query:", err.message);
          res.status(500).send("Server Error: Unable to create event");
        }
      });

      app.listen(3000, () => {
        console.log("listening on 3000");
      });
    }
  });
};

startApi();
