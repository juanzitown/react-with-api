import React from "react";
import useGetTodos from "../../api-hooks/use-get-todos";
import Button from "../../components/button";
import Column from "../../components/column";
import TaskType from "../../types/task-type";
import CreateTodoFormModal from "./create-todo-form-modal";
import ConfirmDeleteModal from "./delete-todo-modal";
import TodoListItem from "./todo-list-item";

type TodosScreenProps = {};

function TodosScreen({}: TodosScreenProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState<TaskType | null>(null);

  const { data: todos, pending } = useGetTodos({});

  const [editItem, setEditItem] = React.useState<TaskType | null>(null);

  return (
    <Column className="bg-gray-200 min-h-screen p-xl gap-md">
      <h1 className="text-3xl font-bold underline">Hello world! TODOS</h1>

      <Column>
        {pending && <Column>Loading...</Column>}
        {todos?.map((task) => (
          <TodoListItem
            key={task.id}
            task={task}
            onEdit={() => {
              setEditItem(task);
              setShowModal(true);
            }}
            onDelete={() => {
              setDeleteItem(task);
            }}
          />
        ))}
      </Column>

      <CreateTodoFormModal
        editTask={editItem}
        open={showModal}
        onClose={() => {
          setEditItem(null);
          setShowModal(false);
        }}
      />

      <ConfirmDeleteModal
        open={!!deleteItem?.id}
        onClose={() => {
          setEditItem(null);
          setDeleteItem(null);
        }}
        task={deleteItem || undefined}
      />

      <Button colorScheme="primary" onClick={() => setShowModal(true)}>
        New Todo
      </Button>
    </Column>
  );
}

export default TodosScreen;
