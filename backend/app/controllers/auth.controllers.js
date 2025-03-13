import config from '..config/auth.config.js';
import db from '../model/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



const Student = db.Student;
const Role= db.Role;


export const signup = async(req, res) => {
    try{
        //Create A new user 
        const student = new Student ({
            username:req.body.username,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,8),
        });

        const role = await Role.findOne({name:'student'});
        student.roles = [role._id];

        //save user to the database 
        await student.save();
        res.status(201).json({message:'Student Registered Successfully'});

    }catch (err){
        res.status(500).json({message:err.message});
    }
};


export const signin = async(req, res) => {
    try{
        //Find the Student by username
        const student = await Student.findOne({username:req.body.username}).populate('roles','-_v');

        if(!student){
            return res.status(404).json({message:'Student not found'});
        }

        //Validate password
        const passwordIsValid = bcrypt.compareSync(req.body.password,student.password);
        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: 'invalid password',
            });
        }

        //Generate Jwt 
        const token = jwt.sign(
            {id:student.id},
            config.secret,{
                algorithm:'HS256',
                expires:86400, //24hrs
            }
        );


        //extract student roles
        const authorities = student.roles.map((role) => 
        `ROLE_${role.name.toUpperCase()}`);

        res.status(200).json({
            id:Student_id,
            username:student.username,
            email: student.email,
            roles:authorities,
            accessToken:token,
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
};