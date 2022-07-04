import React from "react";
import useGetTodos from "../../api-hooks/use-get-todos";
import Button from "../../components/button";
import Column from "../../components/column";
import CreateTodoFormModal from "./create-todo-form-modal";
import TodoListItem from "./todo-list-item";

type TodosScreenProps = {};

function TodosScreen({}: TodosScreenProps) {
  const [showModal, setShowModal] = React.useState(false);

  const { data: todos, pending } = useGetTodos({});

  return (
    <Column className="bg-gray-200 min-h-screen p-xl gap-md">
      <h1 className="text-3xl font-bold underline">Hello world! TODOS</h1>

      <Column>
        {pending && <Column>Loading...</Column>}
        {todos?.map((task) => (
          <TodoListItem key={task.id} task={task} />
        ))}
      </Column>

      <CreateTodoFormModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />

      <Button colorScheme="primary" onClick={() => setShowModal(true)}>
        New Todo
      </Button>
    </Column>
  );
}

export default TodosScreen;
