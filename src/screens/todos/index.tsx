import Button from "../../components/button";
import Column from "../../components/column";
import Row from "../../components/row";

function TodosScreen() {
  return (
    <Column>
      <h1 className="text-3xl font-bold underline">Hello world! TODOS</h1>
      <Row>
        <Button colorScheme="danger">danger</Button>
        <Button colorScheme="primary">primary</Button>
      </Row>
    </Column>
  );
}

export default TodosScreen;
