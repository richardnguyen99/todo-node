import { Router } from "express";

const publicRouter = Router();

publicRouter.get("/", (_req, res) => {
    res.render("index", { title: "Express App" });
});

publicRouter.get("/about", (_req, res) => {
    res.render("about", { title: "About" });
});

publicRouter.get("/signin", (_req, res) => {
    res.render("signin", { title: "Sign In" });
});

publicRouter.get("/signup", (_req, res) => {
    res.render("signup", { title: "Sign Up" });
});

export default publicRouter;
