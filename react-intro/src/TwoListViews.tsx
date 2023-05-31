import { useMemo, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";

type List = {
  items: string[];
  setItems: (items: string[]) => void;
  active: number[];
  setActive: (active: number[]) => void;
};

function useList(defaultItems: string[]): List {
  const [items, setItems] = useState(defaultItems);
  const [active, setActive] = useState<number[]>([]);

  return useMemo(
    () => ({
      items,
      setItems,
      active,
      setActive,
    }),
    [items, setItems, active, setActive]
  );
}

function CarList({ list }: { list: List }) {
  return (
    <ListGroup>
      {list.items.map((item, i) => (
        <ListGroup.Item
          active={list.active.includes(i)}
          onClick={() => {
            const tempList = [...list.active];
            if (list.active.includes(i)) {
              tempList.splice(i, 1);
            } else {
              tempList.push(i);
            }
            list.setActive(tempList);
          }}
          key={item}
        >
          {item}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

function SingleMoveButton({
  text,
  fromList,
  toList,
}: {
  text: string;
  fromList: List;
  toList: List;
}) {
  return (
    <Button
      onClick={() => {
        const selectedItems = [...fromList.active];
        // We sort the items has they have to be in order for the removal.
        selectedItems.sort((a, b) => a - b);

        const toMove = selectedItems
          .filter((item) => fromList.items[item] !== undefined)
          .map((item) => fromList.items[item]);
        fromList.setItems(toList.items.concat(toMove));

        console.log(selectedItems, toMove);

        const tempFromList = fromList.items;
        for (let i = 0; i < selectedItems.length; ++i) {
          const item = selectedItems[i];
          // As we move through the array, we delete items, which shifts each item one back.
          // -i accounts for that.
          tempFromList.splice(item - i, 1);
        }
        fromList.setItems(tempFromList);

        fromList.setActive([]);
      }}
    >
      {text}
    </Button>
  );
}

function TwoListViews() {
  const list1 = useList([
    "schnelles auto",
    "langsames auto",
    "corsins auto in trackmania",
  ]);

  const list2 = useList([
    "rotes auto",
    "in die wand gefahrenes auto",
    "automatisches auto",
  ]);

  return (
    <Container>
      <Row>
        <Col>
          <CarList list={list1} />
        </Col>
        <Col sm={1}>
          <Row>
            <Button
              onClick={() => {
                list2.setItems(list2.items.concat(list1.items));
                list1.setItems([]);
              }}
            >
              &gt;&gt;
            </Button>
          </Row>
          <Row>
            <SingleMoveButton text=">" fromList={list1} toList={list2} />
          </Row>
          <Row>
            <SingleMoveButton text="<" fromList={list2} toList={list1} />
          </Row>
          <Row>
            <Button
              onClick={() => {
                list1.setItems(list1.items.concat(list2.items));
                list2.setItems([]);
              }}
            >
              &lt;&lt;
            </Button>
          </Row>
        </Col>
        <Col>
          <CarList list={list2} />
        </Col>
      </Row>
    </Container>
  );
}

export default TwoListViews;
