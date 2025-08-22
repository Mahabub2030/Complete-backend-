// import cookieParser from "cookie-parser";
// import cors from "cors";
// import express, { Request, Response } from "express";
// import expressSession from "express-session";
// import passport from "passport";
// import { envVars } from "./app/config/env";
// import "./app/config/passport";
// import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
// import notFound from "./app/middlewares/notFound";
// import { router } from "./app/routes";

// const app = express()

// app.use(expressSession({
//     secret: envVars.EXPRESS_SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(cookieParser())
// app.use(express.json())
// app.set("trust proxy", 1);
// app.use(express.urlencoded({ extended: true }))
// const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];

// app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin: envVars.FRONTEND_URL,
//     credentials: true
// }))

// app.use("/api/v1", router)

// app.get("/", (req: Request, res: Response) => {
//     res.status(200).json({
//         message: "Welcome to Tour Management System Backend"
//     })
// })


// app.use(globalErrorHandler)

// app.use(notFound)

// export default app
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import passport from "passport";
import { envVars } from "./app/config/env";
import "./app/config/passport";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app = express();

// --- SESSION & PASSPORT SETUP ---
app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.set("trust proxy", 1);

// --- BODY PARSING ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- CORS CONFIGURATION ---
const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow non-browser requests like Postman
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// --- ROUTES ---
app.use("/api/v1", router);

// --- TEST ROUTE ---
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Tour Management System Backend"
    });
});

// --- ERROR HANDLERS ---
app.use(globalErrorHandler);
app.use(notFound);

export default app;
