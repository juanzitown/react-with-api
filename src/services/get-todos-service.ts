import TaskType from "../types/task-type";

type GetTodosServiceProps = {};

async function getTodosService({}: GetTodosServiceProps) {
  return fetch("http://localhost:3333/todos/", { method: "GET" }).then(
    async (response) => {
      const responseAsJson = await response.json();
      return responseAsJson as TaskType[];
    }
  );
}

export default getTodosService;
