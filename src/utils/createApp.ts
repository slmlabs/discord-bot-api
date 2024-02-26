import express, { Express } from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import routes from "../routes";
import store from "connect-mongo";

require("../strategies/discord");

export function createApp(): Express {
  const app = express();
  // Enable Parsing Middleware for Requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // or false, depending on your needs

  // Enable CORS
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );

  //Enable Sessions
  app.use(
    session({
      secret: "OPIAUJGBRIPGH923OUJHBCQW",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      store: store.create({
        mongoUrl: "mongodb://localhost:27017/discord_dashboard",
      }),
    })
  );

  //Enable Passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", routes);
  return app;
}
