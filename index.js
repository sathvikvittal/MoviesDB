import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import multer from "multer"
import {register} from "./controllers/auth.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"public/assets")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
});

const upload = multer({storage});

dotenv.config()
const app = express();
app.use(bodyParser.json({extended:true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


// ROUTES WITH FILES
// app.post("/auth/register",upload.single("picture"),register);
app.post("/auth/register",register);

// ROUTES
app.use("/auth",authRoutes);
app.use("users",userRoutes);


const PORT = process.env.PORT || 6000
mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch(err => {
    console.log(err);
});