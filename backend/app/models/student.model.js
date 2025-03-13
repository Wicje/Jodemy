import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Roles',
            },
        ],
    },
    {timestamps: true}
);

const Student = mongoose.model('Student', studentSchema);
export default Student;