import { FormEvent, useRef, useState } from "react";
import { Form, Row, Stack, Col, Button } from "react-bootstrap";
import ReactSelect from "react-select/creatable";
import { Tag } from "../../types";
import { NewNoteProps } from "./NewNote";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

const NoteForm = ({
  onSubmit,
  addTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NewNoteProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate(-1);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
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
                // When a new tag is created
                onCreateOption={(label) => {
                  const newTag: Tag = { id: v4(), label };
                  addTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                }}
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Content</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            as={"textarea"}
            rows={15}
            required
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit">Save</Button>
          <Button
            onClick={() => navigate(-1)}
            type="button"
            variant="secondary"
          >
            {" "}
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
