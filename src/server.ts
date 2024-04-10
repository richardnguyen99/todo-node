import dotenv from "dotenv";

import createApp from "./app";

dotenv.config();

const app = createApp();

// Mock database connection
setTimeout(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}, 5000);
