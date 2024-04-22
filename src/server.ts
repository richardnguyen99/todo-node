import dotenv from "dotenv";

import createApp from "./app";
import database from "./database";

dotenv.config();

const app = createApp();

database
    .initialize()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                `Server is running on http://localhost:${process.env.PORT}`,
            );
        });
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
    });
