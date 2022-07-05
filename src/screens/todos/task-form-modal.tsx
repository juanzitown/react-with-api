import React from "react";
import useCreateTodo from "../../api-hooks/use-create-todo";
import useUpdateTodo from "../../api-hooks/use-update-todo";
import Button from "../../components/button";
import Column from "../../components/column";
import Form from "../../components/form";
import Input from "../../components/input";
import Modal, { ModalProps } from "../../components/modal";
import Row from "../../components/row";
import useForm from "../../hooks/use-form";
import required from "../../hooks/use-form/required";
import TaskType from "../../types/task-type";

type ChangeTodoFormModalProps = {
  edit: TaskType | undefined;
  setEdit: () => void;
} & ModalProps;

function ChangeTodoFormModal({
  open,
  onClose,
  edit,
  setEdit,
}: ChangeTodoFormModalProps) {
  const { fetch: fetchCreateTodo, pending: pendingCreate } = useCreateTodo({
    onSuccess: () => {
      reset();
      onClose?.();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { fetch: fetchUpdateTodo, pending: pendingUpdate } = useUpdateTodo({
    onSuccess: () => {
      reset();
      onClose?.();
    },
    onError: (error: string) => {
      console.log(error);
    },
  });

  const editTask = (edit: TaskType) => {
    fetchUpdateTodo({
      task: {
        id: edit.id,
        title: getValue("title"),
      } as TaskType,
    });
    setEdit({});
  };

  const { getValue, getValues, setValue, setValues, reset, getError, submit } =
    useForm({
      onSubmit: (values) => {
        edit === undefined
          ? fetchCreateTodo({
              task: {
                id: String(new Date().getTime()),
                title: getValue("title"),
              } as TaskType,
            })
          : editTask(edit);
      },
      validations: {
        title: [required],
      },
    });

  React.useEffect(() => {
    if (open) {
      reset();
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
            <Button type="submit" colorScheme="primary" pending={pendingCreate}>
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

export default ChangeTodoFormModal;
