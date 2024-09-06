import express, { Application } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path, { dirname } from "path";
import favicon from "serve-favicon";
import { ConnectDB } from "./utilities/connectDb";
import { fileURLToPath } from "url";
import { Userrouter } from "./v1/Routes";

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
app.use(cookieParser());

app.get("/", (_req, res) => {
	res.status(200).json({ msg: "Welcome" });
});

app.use("/api/v1/auth", Userrouter);
app.all("*", (_req, res) => {
	res.status(200).json({ msg: "can't find route" });
});

const PORT = process.env.PORT;
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qljvr.mongodb.net/simpletasks?retryWrites=true&w=majority&appName=Cluster0`;

const connectServer = async () => {
	await ConnectDB(URI);
	app.listen(PORT, () => {
		console.log("server is listening at port", PORT);
	});
};

connectServer();
