import React from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
// import { method } from 'lodash';
import { useState, useEffect } from "react";

//  PROYECTO FETCH

export const TodoList = () => {
  const [listItems, setListItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentMarked, setCurrentMarked] = useState("");

  const getTodosUser = () => {
    fetch("https://playground.4geeks.com/todo/users/JDorta19", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.todos);
        setListItems(response.todos);
      })
      .catch(() => console.log("Tareas"));
  };
  useEffect(() => {
    getTodosUser();
  }, []);

  const UpdateList = (ItemTask) => {
    fetch("https://playground.4geeks.com/todo/todos/JDorta19", {
      method: "POST",
      body: JSON.stringify(ItemTask),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("success:", response);
      })
      .catch((error) => console.log(error));
  };

  const deleteList = (ItemTask) => {
    fetch("https://playground.4geeks.com/todo/todos/JDorta19", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const createItem = (ItemTask) => {
    let newTask = { label: ItemTask };
    UpdateList(newTask);
    getTodosUser();
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
            {item.label}
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
