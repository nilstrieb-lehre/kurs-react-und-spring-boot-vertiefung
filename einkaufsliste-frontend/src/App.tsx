import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocalState as useLocalStorageState } from "./useLocalState";
import ShoppingList from "./ShoppingList";
import { useCallback, useState } from "react";
import CreateListModal, {
  CloseAction as CreateCloseAction,
} from "./CreateListModal";
import { createList } from "./shopping-list-service";
import JoinListModal, { CloseAction as JoinCloseAction } from "./JoinListModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [lists, setLists] = useLocalStorageState<string[]>(
    ["TEST1", "TEST2"],
    "shoppingLists"
  );

  const [isAddingList, setIsAddingList] = useState(false);
  const [isJoiningList, setIsJoiningList] = useState(false);

  const onCreateListClose = useCallback(
    (action: CreateCloseAction) => {
      setIsAddingList(false);
      if (action.type === "cancel") {
        return;
      }
      createList(action.name).then((list) => setLists([...lists, list.id]));
    },
    [lists, setLists]
  );

  const onJoinListClose = useCallback(
    (action: JoinCloseAction) => {
      setIsJoiningList(false);
      if (action.type === "cancel") {
        return;
      }
      setLists([...lists, action.id]);
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
            <Button
              variant="outline-primary"
              onClick={() => setIsAddingList(true)}
            >
              create new list
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => setIsJoiningList(true)}
            >
              join list
            </Button>
            <CreateListModal show={isAddingList} onClose={onCreateListClose} />
            <JoinListModal show={isJoiningList} onClose={onJoinListClose} />
          </Col>
        </Row>

        <hr />
        <Button
          variant="outline-danger"
          onClick={() => {
            localStorage.removeItem("shoppingLists");
            window.location.reload();
          }}
        >
          debug: clear localstorage
        </Button>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
