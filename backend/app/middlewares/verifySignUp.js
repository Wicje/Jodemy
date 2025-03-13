import db from '../model/index.js';


const ROLES = db.ROLES;
const Student = db.Student;

const checkDuplicateUsernameOrEmail = async (req, res, next) =>{
    try{
        //Check if username exists
        const studentByUsername = await Student.findOne({ username:req.body.us});
        if (studentByUsername) {
            return res.status(400).json({message:'Failed! Username is already in use!'});
        }

        //Check if email exist
        const studentByEmail = await  Student.findOne({email:req.body.email});
        if (studentByEmail){
            return res.status(500).json({message:'Failed! Email is already in use'});
        }

        next();
    }catch(err){
        res.status(500).json({message:err.message});
    }
};


const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        const invalidRoles = req.body.roles.filter((role) => !ROLES.includes(role));
        if (invalidRoles.length > 0){
            return res.status(400).json({
                message:`Failed! Roles[${invalidRoles.join(',')}] do nor exist!`,
            });
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
};


export default verifySignUp;

