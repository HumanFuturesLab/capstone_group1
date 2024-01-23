import express, { Request, Response } from "express";
import { Pool, Client } from "pg";
import { UUID } from "bson";

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
  client.connect(async (err) => {
    if (err) {
      console.error("connection error", err.stack);
    } else {
      // connected now do stuff
      console.error("connected");

      function isValidObjectId(id: string): boolean {
        return UUID.isValid(id);
      }

      // Return data object of users
      app.get("/users", async (req, res) => {
        let x = await client.query("SELECT * FROM users;");
        res.json({ data: x["rows"] });
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

      app.get("/posts/:id", async (req, res) => {
        let posts = await client.query(
          `SELECT * FROM Posts WHERE Posts.userID = '${req.params.id}'`
        );

        res.json({ data: posts.rows });
      });

      app.get("/events/:id", async (req, res) => {
        let eventIDs = await client.query(
          `SELECT signups.eventID FROM signups WHERE signups.userID = $1`,
          [req.params.id]
        );

        let events = await client.query(`SELECT * FROM events WHERE `);
      });

      app.listen(3000, () => {
        console.log("listening on 3000");
      });
    }
  });
};

startApi();