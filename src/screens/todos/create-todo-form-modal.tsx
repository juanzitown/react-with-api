import React from "react";
import useCreateTodo from "../../api-hooks/use-create-todo";
import useEditTodo from "../../api-hooks/use-edit-todo";
import Button from "../../components/button";
import Column from "../../components/column";
import Form from "../../components/form";
import Input from "../../components/input";
import Modal, { ModalProps } from "../../components/modal";
import Row from "../../components/row";
import useForm from "../../hooks/use-form";
import required from "../../hooks/use-form/required";
import editTodoService from "../../services/edit-todo-service";
import TaskType from "../../types/task-type";

type CreateTodoFormModalProps = { editTask?: TaskType | null } & ModalProps;

function CreateTodoFormModal({
  open,
  onClose,
  editTask,
}: CreateTodoFormModalProps) {
  const { fetch: fetchCreateTodo, pending: pendingCreate } = useCreateTodo({
    onSuccess: () => {
      reset();
      onClose?.();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { fetch: fetchEditTodo, pending: pendingEdit } = useEditTodo({
    onSuccess: () => {
      reset();
      onClose?.();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { getValue, setValue, reset, getError, submit } = useForm({
    onSubmit: () => {
      editTask
        ? fetchEditTodo({
            ...formTask,
            id: editTask.id,
          })
        : fetchCreateTodo({
            task: formTask,
          });
    },
    validations: {
      title: [required],
    },
  });

  const formTask: TaskType = {
    id: String(new Date().getTime()),
    title: getValue("title"),
  };

  React.useEffect(() => {
    if (open) {
      reset();
      if (editTask) setValue("title", editTask.title);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Form onSubmit={submit}>
        <Column className="gap-md">
          <Column>Task</Column>
          <Column>
            <Input
              value={getValue("title")}
              onChange={(value) => setValue("title", value)}
            />
            <Column className="text-danger-500 text-sm h-0">
              {getError("title")}
            </Column>
          </Column>
          <Row className="gap-md">
            <Button
              type="submit"
              colorScheme="primary"
              pending={editTask ? pendingEdit : pendingCreate}
            >
              Save
            </Button>
            <Button colorScheme="primary" onClick={onClose}>
              Cancel
            </Button>
          </Row>
        </Column>
      </Form>
    </Modal>
  );
}

export default CreateTodoFormModal;
