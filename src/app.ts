import express from "express";

const createApp = () => {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  return app;
};

export default createApp;
