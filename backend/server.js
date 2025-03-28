import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './app/models/index.js';
import authRoutes from './app/routes/auth.routes.js';
import userRoutes from './app/routes/user.routes.js';
import courseRoutes from './app/routes/course.routes.js';

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
 courseRoutes(app);

 //Set port 
 const PORT  = process.env.PORT || 8080;
 app.listen(PORT, () => {
    console.log("Server is running on ${PORT}.");
});

 //connect to Mongodb and start server
db.mongoose.connect(`mongodb://${db.config.HOST}:${db.config.PORT}/${db.config.DB}`)
.then(() => {
    console.log("Successfully connected to MongoDB");
    //Initialize roles in the database 
    initial();
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

/*Sync Database
db.mongoose.connect(db.url)
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to database");
    process.exit();
});*/