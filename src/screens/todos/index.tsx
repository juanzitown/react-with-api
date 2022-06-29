import React from "react";
import Button from "../../components/button";
import Column from "../../components/column";
import Input from "../../components/input";
import Row from "../../components/row";

function TodosScreen() {
  const [value, setValue] = React.useState("");
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
