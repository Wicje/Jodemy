import db from '../models/index.js';

const Tutorial = db.tutorial;

//Create and Save a new Tutorial
export const create = (req, res) => {
    //Validate request 
    if (!req.body.title) {
        res.status(400).send({
            message:"Content can not be empty"
        });
        return;
    }

    //Create a Tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description:req.body.description,
        published: req.body.published ? req.body.published: false
    });

    //Save a tutorial in the database
    tutorial
    .save(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
            err.message || "Some error occurred while crating the Tutorial."
        });
    });
};


////Retrieve All tutorial
export const findAll =  (req, res) => {
    //Allow a filter condition via query parameter
    const title = req.body.title;
    const condition = title ? {title:{[Option.like]: '%${title}%'}}: null;

    Tutorial.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials"
        });
    });
};

//Find a single Tutorial byId
export const findOne =(req, res) => {
    const id = req.params.id;

//FInd Tutorial by Primary key 
Tutorial.findById(id)
.then(data => {
    if (!data)
        res.status(404).send({message:"Not found Tutorial with id" + id});
    else res.send(data);
})
.catch(err => {
    res.status(500)
    .send({message: "Error retrieving Tutorial with id=" + id});
});
};


//Update a tutorial by Id
export const update = (req, res) => {
    const id = req.params.id;


    //Update the Tutorial with specified id
    Tutorial.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
    .then(data => {
        if(!data) {
            res.status(404).send({
                message:'cannot update tutorial with id=${id}'
            });
        } else
    })
}