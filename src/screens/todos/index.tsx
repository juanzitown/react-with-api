import React from "react";
import Button from "../../components/button";
import Column from "../../components/column";
import Input from "../../components/input";
import Modal from "../../components/modal";
import useForm from "../../hooks/use-form";
import getTodosService from "../../services/get-todos-service";
import TaskType from "../../types/task-type";
import TodoListItem from "./todo-list-item";
import postTodoService from "../../services/post-todo-service";

type TodosScreenProps = {};

function TodosScreen({}: TodosScreenProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [pending, setPending] = React.useState(true);
  const [todos, setTodos] = React.useState<TaskType[]>([]);
  const [newTask, setNewTask] = React.useState({} as TaskType);
  const { getValue, setValue, getError } = useForm({
    validations: {
      title: [],
    },
  });

  async function fetchTodos() {
    const response = await getTodosService({});
    setTodos(response);
    setPending(false);
  }

  const addNewTask = async (task: TaskType) => {
    await postTodoService(newTask);
    await fetchTodos();
    setNewTask("");
  };

  React.useEffect(() => {
    fetchTodos();
  }, []);

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

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Column>Write the task</Column>
        <Input
          value={newTask.title}
          onChange={(value) =>
            setNewTask({ id: String(todos.length + 1), title: value })
          }
        />
        <Button
          colorScheme="info"
          onClick={() => {
            addNewTask(newTask), setShowModal(false);
          }}
        >
          Create Task
        </Button>
      </Modal>

      <Button colorScheme="primary" onClick={() => setShowModal(true)}>
        New Task
      </Button>
    </Column>
  );
}

export default TodosScreen;
