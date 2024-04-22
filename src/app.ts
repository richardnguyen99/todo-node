import path from "path";
import express from "express";

import { User } from "./models/user.entity";
import publicRouter from "./routes/public";
import database from "./database";

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

    app.post("/signup", async (req, res) => {
        const newUser = req.body;

        // Basic validation (more robust validation would be needed in production)
        if (!newUser.username || !newUser.email || !newUser.password) {
            return res.status(400).send("Missing username, email, or password");
        }

        const userRepo = database.getRepository(User);

        const user = userRepo.create();
        user.username = newUser.username;
        user.email = newUser.email;
        user.password = newUser.password;

        console.log(user);

        await userRepo.save(user);

        res.status(201).send("User registered successfully");
    });

    return app;
};

export default createApp;
