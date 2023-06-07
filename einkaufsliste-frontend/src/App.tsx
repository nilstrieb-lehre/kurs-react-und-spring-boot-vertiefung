import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocalState as useLocalStorageState } from "./useLocalState";
import ShoppingList from "./shopping-list/ShoppingList";
import { useCallback } from "react";
import CreateListModal from "./shopping-list/CreateListModal";
import { createList, joinList } from "./shopping-list/shopping-list-service";
import JoinListModal from "./shopping-list/JoinListModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JoinedList } from "./shopping-list/list";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useLocalStorageState<string | null>(null, "token");

  const [lists, setLists] = useLocalStorageState<JoinedList[]>(
    [
      { id: "TEST1", token: "0097bbaf-3331-4c1d-8ba9-63db06949a54" },
      { id: "TEST2", token: "1097bbaf-3331-4c1d-8ba9-63db06949a54" },
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
      <ReactQueryDevtools initialIsOpen={false}/>
      <Container>
        {token === null ? (
          <Row>
            <br />
            <Register setToken={setToken} />
            <Login setToken={setToken} />
          </Row>
        ) : (
          <Row>
            <h1>you are logged in!</h1>
            <Button onClick={() => setToken(null)}>log out</Button>
          </Row>
        )}
        <br />
        <hr />
        <Row>
          <Col>
            {lists.map((list) => (
              <div key={list.id}>
                <ShoppingList
                  joinedList={list}
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
