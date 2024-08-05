import express from 'express';
import mongoose from 'mongoose';

import userRoutes from "./routes/user.routes"
import jobPostRoutes from "./routes/jobPost.routes"
import applyRoutes from "./routes/apply.routes"

const app = express()
const port = 3000

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.use("/user",userRoutes)
app.use("/jobs",jobPostRoutes)
app.use("/apply",applyRoutes)



app.get('/', (req, res) => {
  res.send('welcome to naukri.com lite')
})





mongoose.connect("mongodb://localhost:27017/naukri")
.then(()=>{
    console.log("connected to DB");
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})