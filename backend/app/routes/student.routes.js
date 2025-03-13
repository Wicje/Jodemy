import express from 'express';
import {teacherBoard,allAccess, studentBoard} from '../controllers/student.controller.js';
import {authJwt} from '../middlewares/index.js';

const router = express.Router();

//Public route
router.get('/all', allAccess);

////Student (any authentication)
router.get('/student', [authJwt.verifyToken], userBoard);

//Moderator route
router.get('/teacher', [authJwt.verifyToken, authJwt.isTeacher], teacherBoard);

export default router;

//What is the benefit of nextAuth in this Project__question