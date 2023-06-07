import { Col, Container, Row } from "react-bootstrap";
import { useLocalState as useLocalStorageState } from "./useLocalState";
import ShoppingList from "./ShoppingList";
import { useCallback } from "react";
import CreateListModal from "./CreateListModal";
import { createList, joinList } from "./shopping-list-service";
import JoinListModal from "./JoinListModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JoinedList } from "./list";

const queryClient = new QueryClient();

function App() {
  const [lists, setLists] = useLocalStorageState<JoinedList[]>(
    [
      { id: "TEST1", token: "" },
      { id: "TEST2", token: "" },
    ],
    "shoppingLists"
  );

  const onCreateList = useCallback(
    (name: string) => {
      createList(name).then((list) =>
        setLists([...lists, { id: list.list.id, token: list.user.token }])
      );
    },
    [lists, setLists]
  );

  const onJoinListClose = useCallback(
    (id: string) => {
      joinList(id).then((join) => {
        setLists([...lists, { id, token: join.token }]);
      });
    },
    [lists, setLists]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Row>
          <Col>
            {lists.map((list) => (
              <div key={list.id}>
                <ShoppingList
                  list={list}
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
