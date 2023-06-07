import {
  addProduct,
  editProduct,
  getList,
  Product,
  deleteProduct,
} from "./shopping-list-service";
import { Button, Container, ListGroup, Row, Col } from "react-bootstrap";
import AddItemModal from "./AddItemModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { JoinedList } from "./list";

const ShoppingList: React.FC<{ list: JoinedList; removeList: () => void }> = ({
  list,
  removeList,
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["wishlists", list.id],
    queryFn: () => getList(list.id),
  });

  const onModelClose = (product: Product) => {
    addProduct(list.id, product).then(() => {
      queryClient.invalidateQueries({ queryKey: ["wishlists", list.id] });
    });
  };

  let head;
  if (query.status === "loading") {
    head = <h2>loading...</h2>;
  } else if (query.status === "error") {
    head = (
      <>
        <h2>error fetching {list.id}</h2>
        <div>{query.error as string}</div>
      </>
    );
  } else if (query.data === null) {
    head = <h2>list not found ({list.id})</h2>;
  } else {
    const list = query.data;

    head = (
      <>
        <h2>
          {list.name} ({list.id})
        </h2>
        <ListGroup>
          {list.products.map((product) => (
            <Product
              key={product.id}
              product={product}
              onCheck={(completed) => {
                const newProduct = { ...product, completed };
                editProduct(list.id, newProduct).then(() =>
                  queryClient.invalidateQueries({ queryKey: ["wishlists", list.id] })
                );
              }}
              onDelete={() =>
                deleteProduct(list.id, product.id).then(() =>
                  queryClient.invalidateQueries({ queryKey: ["wishlists", list.id] })
                )
              }
            />
          ))}
        </ListGroup>
      </>
    );
  }

  return (
    <>
      {head}
      <br />
      <Button variant="outline-danger" onClick={removeList}>
        remove list
      </Button>
      {query.data && <AddItemModal onAdd={onModelClose} />}
    </>
  );
};

const Product: React.FC<{
  product: Product;
  onCheck: (checked: boolean) => void;
  onDelete: () => void;
}> = ({ product, onCheck, onDelete }) => (
  <ListGroup.Item>
    <Container>
      <Row>
        <Col xs={1}>
          <input
            type="checkbox"
            checked={product.completed}
            onChange={(e) => onCheck(e.target.checked)}
          />
        </Col>
        <Col>
          <Row>
            {product.name}: {product.quantity}
          </Row>
          <Row>
            {product.location} &mdash; by {product.requester}
          </Row>
        </Col>
        <Col xs={3} sm={2} md={1} onClick={onDelete}>
          <Button variant="outline-danger">delete</Button>
        </Col>
      </Row>
    </Container>
  </ListGroup.Item>
);

export default ShoppingList;
