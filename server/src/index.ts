import express, { Application } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import favicon from "serve-favicon";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

configDotenv();

const app: Application = express();
app.use(express.json());
app.use(
	cors({
		origin: "*",
		credentials: true,
	}),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.get("/", (_req, res) => {
	res.status(200).json({ msg: "Welcome" });
});

app.all("*", (_req, res) => {
	res.status(200).json({ msg: "can't find route" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log("server is listening at port", PORT);
});
