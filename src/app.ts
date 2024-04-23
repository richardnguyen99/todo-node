import path from "path";
import express from "express";
import expressSession from "express-session";
import bcrypt from "bcrypt";
import cors from "cors";

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
    app.use(cors());
    app.use(
        expressSession({
            name: "session_id",
            secret: process.env.EXPRESS_SESSION_SECRET as string,
            resave: false,
            saveUninitialized: true,
            cookie: {
                secure: true,
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

    app.post("/signin", async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Missing username or password");
        }

        const userRepo = database.getRepository(User);
        const user = await userRepo.findOne({ where: { email } });

        if (!user) {
            return res.status(401).send("Invalid username or password");
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("Invalid username or password");
        }

        res.cookie("session_id", req.sessionID);

        res.send("Logged in successfully");
    });

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

    // Example protected route
    app.get("/profile", (req, res) => {
        if (!req.session) {
            return res.status(401).send("Unauthorized");
        }

        // ... Retrieve user data, etc
        console.log(req.session);
        res.send("Welcome to the profile page!");
    });

    return app;
};

export default createApp;
