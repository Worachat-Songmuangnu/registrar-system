import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

export default function EditItem(props) {
  const [form] = Form.useForm();

  // ตรวจสอบ props.isOpen และ props.item เพื่อเปิดหรือปิด Modal
  useEffect(() => {
    if (props.isOpen && props.item) {
      form.setFieldsValue({
        action_datetime: dayjs(props.item.action_datetime),
        type: props.item.type,
        amount: props.item.amount,
        note: props.item.note,
      });
    }
  }, [props.isOpen, props.item, form]);

  const handleFormSubmit = () => {
    form.validateFields().then((formData) => {
      // สั่งปิด Modal และส่งข้อมูลที่ถูกแก้ไขไปยัง parent component
      props.onItemEdited({
        ...formData,
        id: props.item.id, // ส่ง id ของรายการที่แก้ไขไปด้วย
      });
      props.onClose(); // ปิด Modal หลังจากบันทึกข้อมูล
    });
  };

  return (
    <Modal
      title="Edit Transaction"
      visible={props.isOpen}
      onCancel={props.onClose} // ฟังก์ชันปิด Modal
      footer={[
        <Button key="cancel" onClick={props.onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleFormSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="edit_item">
        <Form.Item
          label="Date-Time"
          name="action_datetime"
          rules={[{ required: true, message: 'Please select a date-time!' }]}
        >
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Please select the type!' }]}
        >
          <Select placeholder="Select type">
            <Option value="income">Income</Option>
            <Option value="expense">Expense</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please enter an amount!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Note"
          name="note"
          rules={[{ required: false }]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}
