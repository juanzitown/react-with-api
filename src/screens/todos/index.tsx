import React from "react";
import Button from "../../components/button";
import Column from "../../components/column";
import Input from "../../components/input";
import useForm from "../../hooks/use-form";
import getTodosService from "../../services/get-todos-service";
import postTodoService from "../../services/post-todo-service";
import TaskType from "../../types/task-type";
import CreateNewTodoModal from "./create-new-todo-modal";
import TodoListItem from "./todo-list-item";

type TodosScreenProps = {};

function TodosScreen({}: TodosScreenProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [pending, setPending] = React.useState(true);
  const [todos, setTodos] = React.useState<TaskType[]>([]);

  const { getValue, setValue } = useForm({
    validations: {
      title: [],
    },
  });

  async function fetchTodos() {
    const response = await getTodosService({});
    console.log("todos:", response);
    setTodos(response);
    setPending(false);
  }

  React.useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (data: TaskType) => 
    await postTodoService(data).then(() => {
      setShowModal(false)
      fetchTodos()
    });

  return (
    <Column className="bg-gray-200 min-h-screen p-xl gap-md">
      <h1 className="text-3xl font-bold underline">Hello world! TODOS</h1>
      <Input
        value={getValue("title")}
        onChange={(value) => setValue("title", value)}
      />

      <Column>
        {pending && <Column>Loading...</Column>}
        {todos.map((task) => (
          <TodoListItem key={task.id} task={task} />
        ))}
      </Column>

      <CreateNewTodoModal
        open={showModal}
        onClose={() => setShowModal(false)}
        createTodo={createTodo}
      />

      <Button colorScheme="primary" onClick={() => setShowModal(true)}>
        criar nova tarefa
      </Button>
    </Column>
  );
}

export default TodosScreen;
