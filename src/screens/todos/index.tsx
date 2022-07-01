import React from "react";
import Button from "../../components/button";
import Row from "../../components/row";
import Column from "../../components/column";
import Input from "../../components/input";
import Modal from "../../components/modal";
import useForm from "../../hooks/use-form";
import getTodosService from "../../services/get-todos-service";
import postTodosService from "../../services/post-todos-service";
import TaskType from "../../types/task-type";
import TodoListItem from "./todo-list-item";

type TodosScreenProps = {};

function TodosScreen({ }: TodosScreenProps) {
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

  async function saveNewTask() {
    const newTask = { id: getValue("id"), title: getValue("title") }
    await postTodosService(newTask).then(() => setShowModal(false));

    await fetchTodos()
  }

  React.useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Column className="bg-gray-200 min-h-screen p-xl gap-md">
      <h1 className="text-3xl font-bold underline">Hello world! TODOS</h1>

      <Button colorScheme="primary" onClick={() => setShowModal(true)}>
        Adicionar Task
      </Button>

      <Column>
        {pending && <Column>Loading...</Column>}
        {todos.map((task) => (
          <TodoListItem key={task.id} task={task} />
        ))}
      </Column>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Column>Adicionar Task</Column>

        <Input
          type="text"
          name="new-task"
          value={getValue("title")}
          onChange={(value) => setValue("title", value)}
        />

        <Row className="p-sm gap-sm">
          <Button onClick={() => saveNewTask()} colorScheme="primary">Salvar</Button>
          <Button onClick={() => setShowModal(false)}>Voltar</Button>
        </Row >
      </Modal>
    </Column>
  );
}

export default TodosScreen;
