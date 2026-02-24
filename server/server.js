
// external modules
import express from "express"
import "dotenv/config"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'

// local modules
import connectDB from "./configs/db.js"
import clerkWebhooks from "./controllers/clerkWebhooks.js"

connectDB()
const app = express()

app.use(cors())

// /middleware
app.use(express.json())
app.use(clerkMiddleware())

app.use((req, res, next) => {
        console.log("BODY:", req);
        next()
})
// API to listen clerk webhook
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
    res.send("API is working")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
