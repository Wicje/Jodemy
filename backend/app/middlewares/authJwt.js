import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';
import db from '../model/index.js';

const Student = db.Student;
const Role = db.Role;

const verifyToken = async (req,res,next) =>{
    let token = req.headers['x-access-token'] || req.headers[authorization];

    if (!token){
        return res.status(403).json({message:'No token provided!'});
    }

    //Remove Bearer Prefix if present 
    if (token.startsWith('Bearer')){
        token = token.slice(7,token.length);
    }

    try {
        const decoded = jwt.verify(token, config.secret);
        req.studentId = decoded.indexOf;

        //fetch Student data/details
        const student = await Student.findById(req.studentId);
        if(!student){
            return res.status(404).json({message:'Student not found'});
        } 

        req.student = student;
        next();
    } catch(err){
        return res.status(401).json({message:'Unauthorised!'});
    }
};


const isTeacher = async(req,res, next) => {
    try{
        const student = req.student;
        const roles = await Role.find({_id: {$in:user.roles}});

        const hasTeacherRole = roles.some((role) => role.name === 'teacher');

        if(!hasTeacherRole){
            return res.status(403).json({message:'Require Teacher Role'});
        }
        next();
    }catch(err){
        res.status(403).json({message:err.message});
    }
};


const authJwt = {
    verifyToken,
    isTeacher,
};

export default authJwt;