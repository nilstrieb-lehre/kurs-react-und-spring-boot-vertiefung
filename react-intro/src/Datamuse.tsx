import React, { useRef, useState } from "react";
import { Button, Container, ListGroup, Row } from "react-bootstrap";
import { z } from "zod";

const rhymeResSchema = z.array(
  z.object({
    word: z.string(),
  })
);

async function fetchRhymes(word: string): Promise<string[]> {
  const res = await fetch(
    `https://api.datamuse.com/words?rel_rhy=${encodeURIComponent(word)}`
  );
  const body = await res.json();
  const rhymes = rhymeResSchema.parse(body);
  return rhymes.map((rhyme) => rhyme.word);
}

const Datamuse: React.FC<unknown> = () => {
  const inputField = useRef<HTMLInputElement>(null);
  const [rhymes, setRhymes] = useState<string[]>([]);

  function input() {
    const search = inputField.current?.value;
    if (!search) {
      return;
    }

    fetchRhymes(search).then(setRhymes);
  }

  return (
    <Container>
      <Row>
        <h2>datamuse rhymes</h2>
        <label htmlFor="rhyme-search">search</label>
        <input id="rhyme-search" ref={inputField}></input>
        <Button onClick={input}>search</Button>
        <ListGroup>
          {rhymes.map((rhyme) => (
            <ListGroup.Item>{rhyme}</ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
};

export default Datamuse;
