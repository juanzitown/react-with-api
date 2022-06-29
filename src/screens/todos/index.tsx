import React from "react";
import Button from "../../components/button";
import Column from "../../components/column";
import Input from "../../components/input";
import Row from "../../components/row";

function TodosScreen() {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    fetch("https://my-json-server.typicode.com/juanzitown/react-with-api/todos")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  return (
    <Column className="bg-gray-200 min-h-screen p-xl gap-md">
      <h1 className="text-3xl font-bold underline">Hello world! TODOS</h1>
      <Input value={value} onChange={setValue} />
      <Row>
        <Button colorScheme="danger">danger</Button>
        <Button colorScheme="primary">primary</Button>
      </Row>
    </Column>
  );
}

export default TodosScreen;
