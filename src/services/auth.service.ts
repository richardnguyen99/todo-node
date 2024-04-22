import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { User } from "../models/user.entity";
import database from "../database";

interface UserRegisterData {
    username: string;
    email: string;
    password: string;
}

interface UserLoginData {
    username: string;
    password: string;
}

export class AuthService {
    async register(userData: UserRegisterData): Promise<User> {
        const userRepo = database.getRepository(User);

        const createdUsers = userRepo.create(userData);
        return await userRepo.save(createdUsers);
    }

    async login(userData: UserLoginData): Promise<string> {
        const user = await database.getRepository(User).findOne({
            where: { username: userData.username },
        });

        if (user && (await bcrypt.compare(userData.password, user.password))) {
            return jwt.sign({ userId: user.id }, "your_secret_key");
        } else {
            throw new Error("Invalid credentials");
        }
    }
}
