export const allAccess = (req,res) => {
    res.status(200).send('Public Content');
};

export const studentBoard = (req,res) => {
    res.status(200).send('Student Content');
};


export const teacherBoard = (req,res) => {
    res.status(200).send('Teacher Content');
};


