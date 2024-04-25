import path from "path";
import dotenv from "dotenv";
import express from "express";
import expressSession from "express-session";
import cors from "cors";

import publicRouter from "./routes/public";

dotenv.config();

/**
 * A factory function that configurates Express application and return an
 * Express instance.
 *
 */
const createApp = (): express.Application => {
    const app = express();

    // Configure express middleware
    app.use(cors());
    app.use(
        expressSession({
            name: "session_id",
            secret: process.env.EXPRESS_SESSION_SECRET as string,
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge: 3600000,
            },
        }),
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Configure view engine and static files
    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, "views"));
    app.use(express.static(path.join(__dirname, "public")));

    app.use("/", publicRouter);

    return app;
};

export default createApp;
