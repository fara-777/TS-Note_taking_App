import { Card, Stack, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NoteType } from "./MainPage";

const NoteCard = ({ id, title, tags }: NoteType) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className="h-100 text-decoration-none border-2"
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100 "
        >
          <span className="fs-5">{title} </span>
          {tags.length > 0 && (
            <Stack gap={2}>
              {tags.map((tag) => (
                <Badge key={tag.id}>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
