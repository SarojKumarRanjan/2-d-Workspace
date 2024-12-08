import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()


app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }))



import { router } from "./routes/index";

app.use("/api/v1",router)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
}   )