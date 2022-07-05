import Button from "../../components/button";
import Column from "../../components/column";
import Row from "../../components/row";
import TaskType from "../../types/task-type";
import useDeleteTodo from "../../api-hooks/use-delete-todo";

type TodoListItemProps = {
  task: TaskType;
};

function TodoListItem({ task }: TodoListItemProps) {
  const { fetch: fetchDeleteTodo, pending: pendingDelete } = useDeleteTodo({
    onSuccess: () => {
      window.confirm(`Task ${task.title} deleted`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteTodo = () => {
    fetchDeleteTodo({ task });
  };

  return (
    <Row className="gap-md py-xs px-md border rounded items-center bg-white">
      <input type="checkbox" />
      <Column>{task.id}</Column>
      <Column className="flex-1">{task.title}</Column>
      <Button>Edit</Button>
      <Button colorScheme="danger" onClick={deleteTodo}>
        Delete
      </Button>
    </Row>
  );
}

export default TodoListItem;
