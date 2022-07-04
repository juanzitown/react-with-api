import Button from "../../components/button";
import Column from "../../components/column";
import Row from "../../components/row";
import TaskType from "../../types/task-type";

type TodoListItemProps = {
  task: TaskType;
  onDelete?: () => void;
  onEdit?: () => void;
};

function TodoListItem({ task, onDelete = () => null, onEdit = () => null }: TodoListItemProps) {
  return (
    <Row className="gap-md py-xs px-md border rounded items-center bg-white">
      <input type="checkbox" />
      <Column>{task.id}</Column>
      <Column className="flex-1">{task.title}</Column>
      <Button onClick={onEdit}>Edit</Button>
      <Button colorScheme="danger" onClick={onDelete}>
        Delete
      </Button>
    </Row>
  );
}

export default TodoListItem;
