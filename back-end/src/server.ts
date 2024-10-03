import app from "./app";
import dotenv from "dotenv";
import path from "path";
import { dbConnection } from "./utils/mongodbConnection";

dotenv.config({ path: path.join(__dirname, '../.env') });

dbConnection();
const port: string | number = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is ruunig on Port ${port}`);
})