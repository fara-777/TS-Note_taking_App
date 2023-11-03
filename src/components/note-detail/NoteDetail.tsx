import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./Layout";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type DetailProps = {
  onDeleteNote: (id: string) => void;
};
const NoteDetail = ({ onDeleteNote }: DetailProps) => {
  const note = useNote();

  return (
    <>
      <Row>
        <Col>
          <h1>{note.title}</h1>

          {note.tags.length > 0 && (
            <Stack direction="horizontal" gap={1} className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge key={tag.id}>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs={"auto"}>
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="outline-primary">Edit</Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => onDeleteNote(note.id)}
            >
              Delete
            </Button>
            <Link to={"/"}>
              <Button variant="outline-secondary">Home</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
};

export default NoteDetail;
