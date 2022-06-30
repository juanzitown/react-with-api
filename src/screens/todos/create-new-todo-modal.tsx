import React from "react";
import Button from "../../components/button";
import Column from "../../components/column";
import Input from "../../components/input";
import Modal from "../../components/modal";
import useForm from "../../hooks/use-form";
import TaskType from "../../types/task-type";

type CreateNewTodoModalProps = {
  onClose?: () => void;
  open?: boolean;
  createTodo?: (values: TaskType) => void;
};
const CreateNewTodoModal = ({
  open = false,
  onClose = () => null,
  createTodo = () => null,
}: CreateNewTodoModalProps) => {
  const { getValue, setValue } = useForm({});
  const titleValue = getValue("title");
  return (
    <Modal open={open} onClose={onClose}>
      <Column className="gap-y-sm">
        <Column>
          <span>Nome:</span>
          <Input
            value={titleValue}
            onChange={(value) => setValue("title", value)}
          />
        </Column>
        <Column>
          <Button
            colorScheme="info"
            onClick={() => {
              if (titleValue) {
                createTodo({ id: "", title: titleValue });
                setValue("title", "");
              }
            }}
          >
            criar
          </Button>
        </Column>
      </Column>
    </Modal>
  );
};

export default CreateNewTodoModal;
