import React from "react";
import Button from "../../components/button";
import Column from "../../components/column";
import getTodosService from "../../services/get-todos-service";
import TaskType from "../../types/task-type";
import CreateTodoFormModal from "./create-todo-form-modal";
import TodoListItem from "./todo-list-item";

type TodosScreenProps = {};

function TodosScreen({}: TodosScreenProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [pending, setPending] = React.useState(true);
  const [todos, setTodos] = React.useState<TaskType[]>([]);

  async function fetchTodos() {
    const response = await getTodosService({});
    setTodos(response);
    setPending(false);
  }

  React.useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Column className="bg-gray-200 min-h-screen p-xl gap-md">
      <h1 className="text-3xl font-bold underline">Hello world! TODOS</h1>

      <Column>
        {pending && <Column>Loading...</Column>}
        {todos.map((task) => (
          <TodoListItem key={task.id} task={task} />
        ))}
      </Column>

      <CreateTodoFormModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onCreate={() => {
          fetchTodos();
        }}
      />

      <Button colorScheme="primary" onClick={() => setShowModal(true)}>
        New Todo
      </Button>
    </Column>
  );
}

export default TodosScreen;
