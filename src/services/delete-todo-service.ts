import TaskType from "../types/task-type";

type ParamsType = number | string;
type ResponseType = TaskType;
type ServiceType = (id: ParamsType) => Promise<ResponseType>;

const deleteTodoService: ServiceType = async (id) => {
  return await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
};

export default deleteTodoService;
