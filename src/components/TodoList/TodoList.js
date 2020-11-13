import React from "react";
import { Button, List, Popconfirm } from "antd";
import {
  CheckCircleTwoTone,
  InfoCircleTwoTone,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import moment from "moment";

import "./TodoList.css";

const getDaysRemaning = (deadline, completed) => {
  if (completed) return "";

  if (moment().isAfter(moment(deadline))) return "Deadline Passed";

  return `${moment(deadline).diff(moment(), "days")} day(s) remaining`;
};

const TodoList = ({
  dataSource,
  loading,
  showUpdateTodoForm,
  handleDelete,
  changeStatus,
}) => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      pageSize: 10,
    }}
    dataSource={dataSource}
    loading={loading}
    renderItem={(item) => {
      const actions = [
        <Button
          className="list-actions"
          type="link"
          icon={<EditOutlined />}
          onClick={() => showUpdateTodoForm(item)}
        >
          Update
        </Button>,
        <Popconfirm
          title="Are you sure you want delete this Todo?"
          onConfirm={() => handleDelete(item.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            className="list-actions"
            type="link"
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>,
        <Popconfirm
          title={`Are you sure ${
            item.completed ? `unmark` : `complete`
          } this Todo?`}
          onConfirm={() => changeStatus(item.id, !item.completed)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            className="list-actions"
            type="link"
            icon={item.completed ? <CloseOutlined /> : <CheckOutlined />}
          >
            {item.completed ? `Unmark Todo` : `Mark as Complete`}
          </Button>
        </Popconfirm>,
        getDaysRemaning(item.deadline, item.completed),
      ];

      return (
        <List.Item key={item.id} actions={actions}>
          <List.Item.Meta
            avatar={
              item.completed ? (
                <CheckCircleTwoTone
                  twoToneColor="#52c41a"
                  className="list-title-icon"
                />
              ) : (
                <InfoCircleTwoTone
                  twoToneColor="orange"
                  className="list-title-icon"
                />
              )
            }
            title={item.title}
          />
        </List.Item>
      );
    }}
  />
);

export default TodoList;
