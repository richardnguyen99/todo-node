import express from "express";

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

    app.get("/", (_req, res) => {
        res.send("Hello World");
    });

    return app;
};

export default createApp;
