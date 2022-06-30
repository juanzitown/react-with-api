import React from "react";
import Button from "../../components/button";
import Column from "../../components/column";
import Input from "../../components/input";
import Modal from "../../components/modal";
import useForm from "../../hooks/use-form";
import getTodosService from "../../services/get-todos-service";
import TaskType from "../../types/task-type";
import TodoListItem from "./todo-list-item";

type TodosScreenProps = {};

function TodosScreen({}: TodosScreenProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [pending, setPending] = React.useState(true);
  const [todos, setTodos] = React.useState<TaskType[]>([]);

  const { getValue, setValue, getError } = useForm({
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
        <Column>isso aqui está na modal...</Column>
        <Input
          value={getValue("title")}
          onChange={(value) => setValue("title", value)}
        />
      </Modal>

      <Button colorScheme="primary" onClick={() => setShowModal(true)}>
        open modal
      </Button>
    </Column>
  );
}

export default TodosScreen;
