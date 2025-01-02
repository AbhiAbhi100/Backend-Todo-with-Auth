import { Todo } from '../models/todo.js';
import { User } from '../models/user.js';

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req;
    if (!title || !description) {
      return res.status(403).json({
        success: false,
        message: 'All fields are required',
      });
    }
    const todo = new Todo({ title, description, createdBy: id });
    const todoData = await todo.save();
    console.log('todoData', todoData);
    await User.findByIdAndUpdate(
      id,
      { $push: { tasks: todoData._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: 'Todo created',
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTodos = async (req, res) => {
  const { id } = await req;
  try {
    console.log('id', id);
    const user = await User.findById(id).populate('tasks');

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const { title } = req.body;
    const todo = await Todo.findByIdAndUpdate(todoId, { title }, { new: true });

    await todo.save();

    return res.status(200).json({
      success: true,
      todo,
      message: 'Todo updated.',
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    console.log(error);
  }
};
