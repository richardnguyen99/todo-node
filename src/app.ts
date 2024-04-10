import express from "express";

/**
 * A factory function that configurates Express application and return an
 * Express instance.
 *
 * @returns {express.Application} app
 */
const createApp = () => {
    const app = express();

    app.get("/", (req, res) => {
        res.send("Hello World");
    });

    return app;
};

export default createApp;
