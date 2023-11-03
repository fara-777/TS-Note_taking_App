import { Col, Row, Button, Form } from "react-bootstrap";
import ReactSelect from "react-select";
import { Link } from "react-router-dom";
import { Tag } from "../types";
import { useMemo, useState } from "react";
import NoteCard from "./NoteCard";

export type NoteType = {
  tags: Tag[];
  title: string;
  id: string;
};

type MainProps = {
  availableTags: Tag[];
  notes: NoteType[];
};

const MainPage = ({ availableTags, notes }: MainProps) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  // Filter when tags, title, or notes change
  const filtredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        title === "" ||
        (note.title.toLowerCase().includes(title.toLowerCase()) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => noteTag.id === tag.id)
            )))
      );
    });
  }, [notes, title, selectedTags]);
  return (
    <>
      <Row>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Link to={"/new"}>
            <Button>Create</Button>
          </Link>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Search by Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => ({
                  value: tag.id,
                  label: tag.label,
                }))}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => ({
                      id: tag.value,
                      label: tag.label,
                    }))
                  )
                }
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4 mt-4">
        {filtredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default MainPage;
