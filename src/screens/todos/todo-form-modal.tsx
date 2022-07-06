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

type TodoFormModalProps = {
  task: TaskType | undefined;
} & ModalProps;

function TodoFormModal({ task, open, onClose }: TodoFormModalProps) {
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
    onError: (error) => {
      console.log(error);
    },
  });

  const { getValue, getValues, setValue, setValues, reset, getError, submit } =
    useForm({
      onSubmit: (values: TaskType) => {
        const isEdit = Boolean(values?.id);
        if (isEdit) {
          fetchUpdateTodo({ task: values });
        } else {
          fetchCreateTodo({ task: values });
        }
      },
      validations: {
        title: [required],
      },
    });

  //Update fields with task if any
  React.useEffect(() => {
    if (open) {
      reset();
    }
    setValues({
      ...(task || {}),
    });
  }, [task?.id, open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Form onSubmit={submit}>
        <Column className="gap-md">
          <Column>{task?.id ? "Editing Task" : "New Task"}</Column>
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
              pending={pendingCreate || pendingUpdate}
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

export default TodoFormModal;
