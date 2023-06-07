import { Col, Container, Row } from "react-bootstrap";
import { useLocalState as useLocalStorageState } from "./useLocalState";
import ShoppingList from "./ShoppingList";
import { useCallback } from "react";
import CreateListModal from "./CreateListModal";
import { createList } from "./shopping-list-service";
import JoinListModal from "./JoinListModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [lists, setLists] = useLocalStorageState<string[]>(
    ["TEST1", "TEST2"],
    "shoppingLists"
  );

  const onCreateList = useCallback(
    (name: string) => {
      createList(name).then((list) => setLists([...lists, list.list.id]));
    },
    [lists, setLists]
  );

  const onJoinListClose = useCallback(
    (id: string) => {
      setLists([...lists, id]);
    },
    [lists, setLists]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Row>
          <Col>
            {lists.map((list) => (
              <div key={list}>
                <ShoppingList
                  id={list}
                  removeList={() =>
                    setLists(lists.filter((other) => other !== list))
                  }
                />
                <hr />
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          <Col>
            <CreateListModal onSubmit={onCreateList} />
            <JoinListModal onSubmit={onJoinListClose} />
          </Col>
        </Row>

        <hr />
      </Container>
    </QueryClientProvider>
  );
}

export default App;
