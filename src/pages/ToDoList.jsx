import React from "react";
import { useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";

export const TodoList = () => {
  const firstItems = [
    {
      task: "Clean shoes",
      id: crypto.randomUUID(),
    },
    {
      task: "Make the dinner",
      id: crypto.randomUUID(),
    },
  ];

  const [listItems, setListItems] = useState(firstItems);
  const [inputValue, setInputValue] = useState("");
  const [currentMarked, setCurrentMarked] = useState("");

  const createItem = (ItemTask) => {
    const newItemId = crypto.randomUUID();
    const newItems = listItems.concat({
      task: ItemTask,
      id: newItemId,
    });
    setListItems(newItems);
  };

  const deleteItem = (itemId) => {
    const filteredItems = listItems.filter(
      (listItem) => listItem.id !== itemId,
    );
    setListItems(filteredItems);
  };

  const addTask = () => {
    if (!inputValue.trim()) return;
    createItem(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="Container mt-4" style={{ maxWidth: "600px" }}>
      <h1 className="text-center">ToDoList</h1>
      <div className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder={
            listItems.length === 0
              ? "There are no tasks, add new task"
              : "Add a new task"
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <ListGroup className="my-4">
        {listItems.map((item) => (
          <ListGroup.Item
            key={item.id}
            className="d-flex justify-content-between align-items-center"
            onMouseEnter={() => setCurrentMarked(item.id)}
            onMouseLeave={() => setCurrentMarked("")}
          >
            {item.task}
            {currentMarked === item.id && (
              <Button
                variant="danger"
                size="sm"
                style={{ position: "absolute", right: "16px" }}
                onClick={() => deleteItem(item.id)}
              >
                X
              </Button>
            )}
          </ListGroup.Item>
        ))}
        ;
      </ListGroup>
    </div>
  );
};
