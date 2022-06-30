import React from "react";
import Button from "../../components/button";
import Column from "../../components/column";
import Input from "../../components/input";
import Row from "../../components/row";
import getTodosService from "../../services/get-todos-service";
import TaskType from "../../types/task-type";
import TodoListItem from "./todo-list-item";

type TodosScreenProps = {};

function TodosScreen({}: TodosScreenProps) {
  const [value, setValue] = React.useState("");
  const [todos, setTodos] = React.useState<TaskType[]>([]);

  async function fetchTodos() {
    const response = await getTodosService({});
    console.log("todos:", response);
    setTodos(response);
  }

  React.useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Column className="bg-gray-200 min-h-screen p-xl gap-md">
      <h1 className="text-3xl font-bold underline">Hello world! TODOS</h1>
      <Input value={value} onChange={setValue} />

      <Column>
        {todos.map((task) => (
          <TodoListItem key={task.id} task={task} />
        ))}
      </Column>

      <Row>
        <Button colorScheme="danger">danger</Button>
        <Button colorScheme="primary">primary</Button>
      </Row>
    </Column>
  );
}

export default TodosScreen;
