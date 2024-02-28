import passport from "passport";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { JWTPayload } from "./types";
import jwksRsa from "jwks-rsa";
import { Pool } from "pg";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ["RS256"],
  secretOrKeyProvider: jwksRsa.passportJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-tn5qd8swaoxt8gn0.us.auth0.com/.well-known/jwks.json",
  }),
  issuer: "https://dev-tn5qd8swaoxt8gn0.us.auth0.com/",
  audience: "pRAokchRzJYk61f6hyNJIYNlgmnjEM5r",
};

const client = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gleo",
  password: "postgres",
  port: 5432,
});

passport.use(
  new JwtStrategy(opts, async (jwt_payload: JWTPayload, done) => {
    try {
      const query = `SELECT * from Users WHERE accessToken = $1;`;
      const { rows } = await client.query(query, [jwt_payload.sub]);
      const user = rows[0];
      if (user) {
        return done(null, user);
      } else {
        const user = {
          name: jwt_payload.name,
          accesstoken: jwt_payload.sub,
          address: "",
          email: jwt_payload.email,
          pointscached: 0,
          followers: 0,
        };
        const insertQuery = `INSERT INTO Users (name, accessToken, address, email, pointsCached, followers) VALUES ($1, $2, $3, $4, $5, $6);`;
        await client.query(insertQuery, [
          user.name,
          user.accesstoken,
          user.address,
          user.email,
          user.pointscached,
          user.followers,
        ]);
        return done(null, user);
      }
    } catch (err) {
      console.error("Database connection error", err);
      done(err);
    }
  })
);

export default passport;
