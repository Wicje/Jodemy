import db from '../models/index.js';

const Course = db.courses;

//Create and Save a new course
export const create = (req, res) => {
    //Validate request 
    if (!req.body.title) {
        res.status(400).send({
            message:"Content can not be empty"
        });
        return;
    }

    //Create a course
    const course = new Course({
        title: req.body.title,
        description:req.body.description,
        published: req.body.published ? req.body.published: false
    });

    //Save a Course in the database
    course
    .save(course)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error occurred while crating the course."
        });
    });
};


////Retrieve All course
export const findAll =  (req, res) => {
    //Allow a filter condition via query parameter
    const title = req.body.title;
    const condition = title ? {title:{[Option.like]: '%${title}%'}}: null;

    Course.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving courses"
        });
    });
};

//Find a single Course byId
export const findOne =(req, res) => {
    const id = req.params.id;

//FInd Course by Primary key 
Course.findById(id)
.then(data => {
    if (!data)
        res.status(404).send({message:"Not found Course with id" + id});
    else res.send(data);
})
.catch(err => {
    res.status(500)
    .send({message: "Error retrieving Course with id=" + id});
});
};


//Update a Course by Id
export const update = (req, res) => {
    const id = req.params.id;


    //Update the Course with specified id
    Course.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data => {
        if(!data) {
            res.status(404).send({
                message:'cannot update Course with id=${id}'
            });
        } else res.send ({message: "Course was updated successfully."});
    })
    .catch(err => {
            res.status(500).send({
                message: "Error updating Course with id=" + id 
            });
        });
};

//Delete the Course by id 

export const deleteOne = (req,res) => {

const id = req.param.id;
//Delete a Course with specified id
Course.findByIdAndRemove(id)
.then(data => {
        if(!data){
            res.status(404).send({
                message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
            });
        }else {
            res.send({
                message:"Course was deleted successfully"
            });
        }
    })
.catch(err => {
        res.status(500).send({
            message:"Could not delete Course with id" + id
        });
    });
};
    
    //Delete all Course by a teacher or instructor
export const deleteAll = (req, res) => {
    //delete all course
    Course.deleteMany({})
    .then(data => {
            res.send({
                message:`${data.deletedCount} courses were deleted automatically!`
            });
        })
    .catch(err => {
            res.status(500).send({
                message:
                err.message || 'some error occurred while removing all courses.'
            });
        });
};

//find all published course
export const findAllPublished = (req,res) => {
    //find all published 
    Course.find({published: true})
    .then(data=> {
            res.send(data);
        })
    .catch(err => {
            res.status(500).send({
                message:err.message || "some error occurred while retreiving courses"
            });
        });
};
