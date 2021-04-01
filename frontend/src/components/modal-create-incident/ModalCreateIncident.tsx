import React from "react";
import "antd/dist/antd.css";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import moment, { Moment } from "moment";
export const dateFormat = "DD.MM.YYYY";

type DataType = {
  area: string;
  assignee?: string;
  dateDue: Moment;
  description: string;
  name: string;
  priority: string;
  status: string;
};

interface IncidentCreateFormProps {
  visible: boolean;
  onCreate: (data: DataType) => void;
  onCancel: () => void;
  userNames: any;
}

const IncidentCreateForm = (props: IncidentCreateFormProps) => {
  const { visible, onCreate, onCancel, userNames } = props;
  const [form] = Form.useForm();
  const { Option } = Select;

  function disabledDate(current: Moment) {
    return current && current < moment().endOf("day");
  }

  return (
    <Modal
      visible={visible}
      title="Create a new Incident"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of incident",
            },
          ]}
        >
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input the description of incident",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="assignee" label="Assignee" hasFeedback>
          <Select placeholder="Please select a person" options={userNames} />
        </Form.Item>
        <Form.Item
          name="area"
          label="Area"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input the area of incident",
            },
          ]}
        >
          <Select placeholder="Please select an area">
            <Option value="Bookkeeping">Bookkeeping</Option>
            <Option value="HR">HR</Option>
            <Option value="Technical support">Technical support</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="dateDue"
          label="Due Date"
          rules={[
            {
              required: true,
              message: "Please input the end date of the incident",
            },
          ]}
        >
          <DatePicker disabledDate={disabledDate} format={dateFormat} />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[
            {
              required: true,
              message: "Please input the priority of the incident",
            },
          ]}
        >
          <Select placeholder="Please select a priority">
            <Option value="Blocker">Blocker</Option>
            <Option value="Critical">Critical</Option>
            <Option value="Major">Major</Option>
            <Option value="Normal">Minor</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
              message: "Please input status of the incident",
            },
          ]}
        >
          <Select placeholder="Please select a status">
            <Option value="Open">Open</Option>
            <Option value="Additional information is required">
              Additional information is required
            </Option>
            <Option value="Information provided">Information provided</Option>
            <Option value="Fixed">Fixed</Option>
            <Option value="Checked">Checked</Option>
            <Option value="Closed">Closed</Option>
            <Option value="Reopened">Reopened</Option>
            <Option value="Reject">Reject</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { IncidentCreateForm };
