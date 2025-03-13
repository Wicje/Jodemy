import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './app/models/index.js';
import authRoutes from './backend/app/routes/auth.routes.js';
import userRoutes from './backend/app/routes/user.routes.js';

const app = express();
dotenv.config();

//Middleware config
const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//simple route for testing
app.get("/", (req, res) => {
    res.send.json({message:"welcome to Jodemy"});
});

//Routes
 app.use("/api/auth", authRoutes);
 app.use("/api/test", userRoutes);

 //Set port 
 const PORT  = process.env.PORT || 8080;

 //connect to Mongodb and start server
db.mongoose.connect(`mongodb://${db.config.HOST}:${db.config.PORT}/${db.config.DB}`)
.then(() => {
    console.log("Successfully connected to MongoDB");
    //Initialise roles in the database 
    initial();
    app.listen(PORT, () => {
        console.log("Server is running on ${PORT}.");
    });
})
.catch((err) =>{
    console.error("Connection error");
    process.exit();
});

//Initial function to populate roles 
function initial(){
    db.Role.estimatedDocumentCount()
    .then((count) => {
        if (count === 0){
            return Promise.all([
                new db.Role({name:"student"}).save(),
                new db.Role({name:"teacher"}).save()
            ]);
        }
    })
    .then((roles) => {
        if (roles){
            console.log("Added 'student' and 'teacher' to the role collection");
        }
    })
    .catch((err) => {
        console.error("Error initializing roles:", err);
    });
}