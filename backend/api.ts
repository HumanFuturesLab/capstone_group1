import express, { Request, Response } from "express";
import passport from "./auth0config"; // Import passport configuration
import { Pool, Client } from "pg";
// import { UUID } from "bson";

// express app
const app = express();
app.use(express.json());
app.use(passport.initialize());

const startApi = async () => {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "gleo",
    password: "postgres",
    port: 5432,
  });

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
      app.get("/users", async (req: Request, res: Response) => {
        let x = await client.query("SELECT * FROM users;");
        res.json({ data: x["rows"] });
      });

      app.post(
        "/users",
        passport.authenticate("jwt", { session: false }),
        async (req, res) => {
          if (req.user) {
            res.json({ data: req.user, error: null });
          } else {
            // TODO: make this more robust cause now this wont get hit
            res.status(404).json({ data: {}, error: "User not found" });
          }
        }
      );

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
        const {
          date,
          pointReward,
          name,
          description,
          popMin,
          popMax,
          userID,
          location,
        } = req.body;

        const query = `
          INSERT INTO Events(date, pointReward, name, description, popMin, popMax, userID, location) 
          VALUES($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
        `;

        try {
          const result = await client.query(query, [
            date,
            pointReward,
            name,
            description,
            popMin,
            popMax,
            userID,
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
