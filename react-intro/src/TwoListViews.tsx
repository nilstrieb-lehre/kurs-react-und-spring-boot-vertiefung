import { useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";

function CarList({
  list,
  active,
  setActive,
}: {
  list: string[];
  active: number[];
  setActive: (active: number[]) => void;
}) {
  return (
    <ListGroup>
      {list.map((item, i) => (
        <ListGroup.Item
          active={active.includes(i)}
          onClick={() => {
            const tempList = [...active];
            if (active.includes(i)) {
              tempList.splice(i, 1);
            } else {
              tempList.push(i);
            }
            setActive(tempList);
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
  isLeft,
  active,
  setActive,
  fromList,
  toList,
  setFromList,
  setToList,
}: {
  isLeft: boolean;
  active: number[];
  setActive: (active: number[]) => void;
  fromList: string[];
  toList: string[];
  setFromList: (list: string[]) => void;
  setToList: (list: string[]) => void;
}) {
  return (
    <Button
      onClick={() => {
        const selectedItems = [...active];
        // We sort the items has they have to be in order for the removal.
        selectedItems.sort((a, b) => a - b);

        const toMove = selectedItems
          .filter((item) => fromList[item] !== undefined)
          .map((item) => fromList[item]);
        setToList(toList.concat(toMove));

        console.log(selectedItems, toMove);

        const tempFromList = fromList;
        for (let i = 0; i < selectedItems.length; ++i) {
          const item = selectedItems[i];
          // As we move through the array, we delete items, which shifts each item one back.
          // -i accounts for that.
          tempFromList.splice(item - i, 1);
        }
        setFromList(tempFromList);

        setActive([]);
      }}
    >
      {isLeft ? "<" : ">"}
    </Button>
  );
}

function TwoListViews() {
  const [list1, setList1] = useState([
    "schnelles auto",
    "langsames auto",
    "corsins auto in trackmania",
  ]);
  const [active1, setActive1] = useState<number[]>([]);

  const [list2, setList2] = useState([
    "rotes auto",
    "in die wand gefahrenes auto",
    "automatisches auto",
  ]);
  const [active2, setActive2] = useState<number[]>([]);

  return (
    <Container>
      <Row>
        <Col>
          <CarList list={list1} active={active1} setActive={setActive1} />
        </Col>
        <Col sm={1}>
          <Row>
            <Button
              onClick={() => {
                setList2(list2.concat(list1));
                setList1([]);
              }}
            >
              &gt;&gt;
            </Button>
          </Row>
          <Row>
            <SingleMoveButton
              isLeft={false}
              active={active1}
              setActive={setActive1}
              fromList={list1}
              toList={list2}
              setFromList={setList1}
              setToList={setList2}
            />
          </Row>
          <Row>
            <SingleMoveButton
              isLeft={true}
              active={active2}
              setActive={setActive2}
              fromList={list2}
              toList={list1}
              setFromList={setList2}
              setToList={setList1}
            />
          </Row>
          <Row>
            <Button
              onClick={() => {
                setList1(list1.concat(list2));
                setList2([]);
              }}
            >
              &lt;&lt;
            </Button>
          </Row>
        </Col>
        <Col>
          <CarList list={list2} active={active2} setActive={setActive2} />
        </Col>
      </Row>
    </Container>
  );
}

export default TwoListViews;
