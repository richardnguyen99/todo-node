import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async register(req: Request, res: Response) {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).send(user);
        } catch (error) {
            res.status(400).send((error as Error).message);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const token = await this.authService.login(req.body);
            res.send({ token });
        } catch (error) {
            res.status(401).send((error as Error).message);
        }
    }
}
