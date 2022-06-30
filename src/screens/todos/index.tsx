import { eventNames } from "process";
import React from "react";
import Button from "../../components/button";
import Column from "../../components/column";
import Input from "../../components/input";
import Modal from "../../components/modal";
import useForm from "../../hooks/use-form";
import getTodosService from "../../services/get-todos-service";
import postTodoService from "../../services/post-todo-service";
import TaskType from "../../types/task-type";
import TodoListItem from "./todo-list-item";

type TodosScreenProps = {};

function TodosScreen({}: TodosScreenProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [pending, setPending] = React.useState(true);
  const [newTodo, setNewTodo] = React.useState({} as TaskType)
  const [todos, setTodos] = React.useState<TaskType[]>([]);


  async function fetchTodos() {
    const response = await getTodosService({});
    console.log("todos:", response);
    setTodos(response);
    setPending(false);
  }

  React.useEffect(() => {
    fetchTodos();
  }, []);

  const addNewTodo = (task: TaskType) => {
    postTodoService(task)
    fetchTodos()
  }

  return (
    <Column className="bg-gray-200 min-h-screen p-xl gap-md">
      <h1 className="text-3xl font-bold underline">Hello world! TODOS</h1>

      <Column>
        {pending && <Column>Loading...</Column>}
        {todos.map((task) => (
          <TodoListItem key={task.id} task={task} />
        ))}
      </Column>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Column>isso aqui está na modal...</Column>
        <Input
          value={newTodo.title}
          onChange={(value) => setNewTodo({id: todos.length + 1, title: value})}
        />
        <Button onClick={() => {addNewTodo(newTodo), setShowModal(false)}}>
          Add
        </Button>
      </Modal>

      <Button colorScheme="primary" onClick={() => setShowModal(true)}>
        open modal
      </Button>
    </Column>
  );
}

export default TodosScreen;
