import { useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";

function TwoListViews() {
  const [list1, setList1] = useState([
    "schnelles auto",
    "langsames auto",
    "corsins auto in trackmania",
  ]);
  const [active1, setActive1] = useState<number | null>(null);

  const [list2, setList2] = useState([
    "rotes auto",
    "in die wand gefahrenes auto",
    "automatisches auto",
  ]);
  const [active2, setActive2] = useState<number | null>(null);

  return (
    <Container>
      <Row>
        <Col>
          <ListGroup>
            {list1.map((item, i) => (
              <ListGroup.Item
                active={active1 == i}
                onClick={() => setActive1(active1 === i ? null : i)}
              >
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
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
            <Button
              onClick={() => {
                if (active1 != null && list1[active1] != undefined) {
                  setList2([...list2, list1[active1]]);
                  const tempList = [...list1];
                  tempList.splice(active1, 1);
                  setList1(tempList);
                  setActive1(null);
                }
              }}
            >
              &gt;
            </Button>
          </Row>
          <Row>
            <Button
              onClick={() => {
                if (active2 != null && list2[active2] != undefined) {
                  setList1([...list1, list2[active2]]);
                  const tempList = [...list2];
                  tempList.splice(active2, 1);
                  setList2(tempList);
                  setActive2(null);
                }
              }}
            >
              &lt;
            </Button>
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
          <ListGroup>
            {list2.map((item, i) => (
              <ListGroup.Item
                active={active2 == i}
                onClick={() => setActive2(active2 === i ? null : i)}
              >
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default TwoListViews;
