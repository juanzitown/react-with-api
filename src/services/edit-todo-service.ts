import TaskType from "../types/task-type";

type ParamsType = TaskType;
type ResponseType = TaskType;
type ServiceType = (data: ParamsType) => Promise<ResponseType>;

const editTodoService: ServiceType = async (data) => {
  return await fetch(`http://localhost:4000/todos/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

export default editTodoService;
