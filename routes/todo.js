import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createTodo).get(getAllTodos);
router.route("/:todoId").put(isAuthenticated, updateTodo).delete(deleteTodo);

export default router;
