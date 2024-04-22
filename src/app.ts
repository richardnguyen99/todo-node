import path from "path";
import express from "express";

import publicRouter from "./routes/public";

/**
 * A factory function that configurates Express application and return an
 * Express instance.
 *
 */
const createApp = (): express.Application => {
    const app = express();

    // Configure express middleware
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
