import React from "react";
import { Form, Input, DatePicker, Modal, Card, message } from "antd";
import moment from "moment";

import "./TodoForm.css";

const TodoForm = ({
  initialValues,
  title,
  okText,
  visible,
  onOk,
  onCancel,
  form,
}) => (
  <Modal
    visible={visible}
    title={title}
    okText={okText}
    cancelText="Cancel"
    onCancel={onCancel}
    destroyOnClose
    onOk={() => {
      form
        .validateFields()
        .then((values) => {
          onOk(values);
        })
        .catch(() => {
          message.error("Form Validate Failed:", 5);
        });
    }}
  >
    <Card>
      <Form
        form={form}
        initialValues={{
          ...initialValues,
          deadline: initialValues?.deadline
            ? moment(initialValues.deadline)
            : undefined,
        }}
        layout="vertical"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please add a title!" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          label="Deadline"
          name="deadline"
          rules={[{ required: true, message: "Please add a deadline!" }]}
        >
          <DatePicker className="datePicker" />
        </Form.Item>
      </Form>
    </Card>
  </Modal>
);

export default TodoForm;
