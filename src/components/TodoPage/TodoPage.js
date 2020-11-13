import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  PageHeader,
  Button,
  Input,
  Select,
  message,
  Space,
  Form,
} from "antd";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../../actions";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

import "./TodoPage.css";

const { Option } = Select;

const TodoPage = () => {
  const [status, setStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  console.log(selectedTodo);
  const [form] = Form.useForm();

  const { todos, loading, errorText } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Todo Application";
  });

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    setDataSource(
      todos.filter((todo) => {
        let showTodo;

        switch (status) {
          case "incomplete":
            showTodo = !todo.completed;
            break;
          case "completed":
            showTodo = todo.completed;
            break;
          default:
            showTodo = true;
            break;
        }

        if (!showTodo) {
          return false;
        }

        if (!searchTerm) return true;

        return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [todos, status, searchTerm]);

  const handleSearch = ({ target: { value: searchTerm } }) =>
    setSearchTerm(searchTerm);

  const handleChange = (value) => {
    setStatus(value);
  };

  const showAddTodoForm = () => {
    setShowModal(true);
  };

  const showUpdateTodoForm = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
      .then(() => {
        message.success("Todo Item Deleted", 5);
      })
      .catch(() => message.error("Error deleting Todo", 5));
  };

  const changeStatus = (id, newStatus) => {
    dispatch(updateTodo(id, { completed: newStatus }))
      .then(() => {
        message.success(
          `Todo Item ${newStatus ? `marked` : `unmarked`} as complete`,
          5
        );
      })
      .catch(() =>
        message.error(
          `Error ${newStatus ? `marking` : `unmarking`} Todo as complete`,
          5
        )
      );
  };

  const handleOk = (data) => {
    if (selectedTodo) {
      dispatch(updateTodo(selectedTodo.id, data))
        .then(() => {
          form.resetFields();
          setSelectedTodo(null);
          setShowModal(false);
          message.success("Todo Item Updated", 5);
        })
        .catch(() => message.error("Error updating Todo", 5));
    } else {
      dispatch(createTodo(data))
        .then(() => {
          form.resetFields();
          setShowModal(false);
          message.success("Todo Item Created", 5);
        })
        .catch(() => message.error("Error creating Todo", 5));
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedTodo(null);
    setShowModal(false);
  };

  if (errorText) {
    message.error(errorText, 5);
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <PageHeader
            title="Todo App"
            subTitle="A simple application for managing Todos."
          />
        </Col>
      </Row>
      <Row justify="space-between" className="actions-row">
        <Col md={8} xs={24}>
          <Input.Search
            placeholder="Enter Search"
            onChange={handleSearch}
            className="searchField"
          />
        </Col>
        <Space>
          <Select
            style={{ width: 120, marginRight: 15 }}
            defaultValue="all"
            onChange={handleChange}
          >
            <Option value="all">All</Option>
            <Option value="incomplete">Incomplete</Option>
            <Option value="completed">Completed</Option>
          </Select>
          <Button type="primary" onClick={showAddTodoForm}>
            Add Todo
          </Button>
        </Space>
      </Row>
      <TodoList
        dataSource={dataSource}
        loading={loading}
        showUpdateTodoForm={showUpdateTodoForm}
        handleDelete={handleDelete}
        changeStatus={changeStatus}
      />
      {showModal && (
        <TodoForm
          initialValues={selectedTodo}
          title={!selectedTodo ? "Add Todo Item" : "Update Todo Item"}
          visible={showModal}
          okText={!selectedTodo ? "Add" : "Update"}
          onOk={handleOk}
          onCancel={handleCancel}
          form={form}
        />
      )}
    </>
  );
};

export default TodoPage;
