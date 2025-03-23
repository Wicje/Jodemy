import * as course from "../controllers/course.controller.js";
import express from "express";

export default (app) => {
  let router = express.Router();

  //Create a new course
  router.post("/", course.create);

  // Retrieve all courses
  router.get("/", courses.findAll);

  // Retrieve a single course with id
  router.get("/:id", courses.findOne);

  // Update a course with id
  router.put("/:id", courses.update);

  // Delete a course with id
  router.delete("/:id", courses.deleteOne);

  // Delete all courses
  router.delete("/", courses.deleteAll);

  // Find all published courses
  router.get("/published", courses.findAllPublished);

  app.use("/api/courses", router);
};
