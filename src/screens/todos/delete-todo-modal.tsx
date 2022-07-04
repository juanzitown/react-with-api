import React from "react";
import useDeleteTodo from "../../api-hooks/use-delete-todo";
import Button from "../../components/button";
import Column from "../../components/column";
import Heading from "../../components/heading";
import Modal, { ModalProps } from "../../components/modal";
import Row from "../../components/row";
import TaskType from "../../types/task-type";

type ConfirmDeleteModalProps = {
  task: TaskType | undefined;
  onConfirm?: () => void;
} & ModalProps;

const ConfirmDeleteModal = ({
  open,
  onClose,
  task = { title: "", id: "" },
  onConfirm = () => null,
}: ConfirmDeleteModalProps) => {
  const { fetch: fetchDeleteTodo, pending: pendingDelete } = useDeleteTodo({
    onSuccess: onClose,
    onError: (error) => console.log(error),
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Column className="space-y-md">
        <Heading value={3}>
          Você tem certeza que quer deletar a tarefa
          {task.title && " " + `"${task.title}"`}?
        </Heading>
        <Row className="space-x-sm flex-grow">
          <Column className="flex-1">
            <Button colorScheme="danger" onClick={onClose}>
              cancelar
            </Button>
          </Column>
          <Column className="flex-1">
            <Button
              colorScheme="success"
              onClick={() => {
                fetchDeleteTodo(task.id);
                onConfirm();
              }}
              pending={pendingDelete}
            >
              ok
            </Button>
          </Column>
        </Row>
      </Column>
    </Modal>
  );
};

export default ConfirmDeleteModal;
