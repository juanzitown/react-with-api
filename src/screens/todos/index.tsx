import React, { useState } from "react";
import useGetTodos from "../../api-hooks/use-get-todos";
import Button from "../../components/button";
import Column from "../../components/column";
import editTodoService from "../../services/edit-todo-service";
import TaskType from "../../types/task-type";
import CreateTodoFormModal from "./create-todo-form-modal";
import TodoListItem from "./todo-list-item";

type TodosScreenProps = {};

function TodosScreen({}: TodosScreenProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const { data: todos, pending } = useGetTodos({});

  const [selectedItem, setSelectedItem] = React.useState<TaskType | null>(null);

  const editTodo = () => {
    if (selectedItem) {
      editTodoService(selectedItem);
    }
  };

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
              setSelectedItem(task);
              setShowModal(true);
            }}
            onDelete={() => setSelectedItem(task)}
          />
        ))}
      </Column>

      <CreateTodoFormModal
        editTask={selectedItem}
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedItem(null)
        }}
      />

      <Button colorScheme="primary" onClick={() => setShowModal(true)}>
        New Todo
      </Button>
    </Column>
  );
}

export default TodosScreen;
