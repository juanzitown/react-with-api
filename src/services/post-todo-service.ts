import TaskType from "../types/task-type";

type postTodoServiceParams = TaskType;
type postTodoServiceResponse = Response;
type postTodoServiceProps = (
  params: postTodoServiceParams
) => Promise<postTodoServiceResponse>;

const postTodoService: postTodoServiceProps = async (data) =>
  fetch("https://my-json-server.typicode.com/juanzitown/react-with-api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export default postTodoService;
