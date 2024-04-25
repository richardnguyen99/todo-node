import { DataSource } from "typeorm";

import { User } from "./models/user.entity";

const database: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "my-express",
    synchronize: true,
    driver: require("pg"),
    entities: [User],
});

export default database;
