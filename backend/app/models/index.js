import dbConfig from '../config/db.config.js'; 
import mongoose from 'mongoose';
import jodemy from '.jodemy.model.js';
import Role from './role.model.js';
import Student from './student.model.js';


mongoose.Promise = global.Promise;


const db = {};

db.mongoose = mongoose;
db.url = 'mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB';
db.tutorial = Tutorial(mongoose);  //I need to be very careful
db.Student = Student;
db.Role = Role;

db.ROLES = ['student', 'teacher'];
db.config = dbConfig;



export default db;