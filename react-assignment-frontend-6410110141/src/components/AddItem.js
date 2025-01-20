import { Button, Form, Select, Input, InputNumber } from 'antd';

export default function AddItem(props) {
  return (
    <Form layout="inline" onFinish={props.onItemAdded}>
      {/* ชนิด */}
      <Form.Item
        name="type"
        label="ชนิด"
        rules={[{ required: true }]}
      >
        <Select
          allowClear
          style={{ width: "100px" }}
          options={[
            { value: 'income', label: 'รายรับ' },
            { value: 'expense', label: 'รายจ่าย' },
          ]}
        />
      </Form.Item>

      {/* จำนวนเงิน */}
      <Form.Item
        name="amount"
        label="จำนวนเงิน"
        rules={[{ required: true }]}
      >
        <InputNumber placeholder="จำนวนเงิน" />
      </Form.Item>

      {/* หมายเหตุ */}
      <Form.Item
        name="note"
        label="หมายเหตุ"
        rules={[{ required: true }]}
      >
        <Input
        style={{ width: "140px" }} 
        placeholder="Note" />
      </Form.Item>

      {/* ปุ่มเพิ่ม */}
      <Form.Item>
        <Button
        style={{ backgroundColor: "blue", borderColor: "blue", color: "white" }}
        type="primary" 
        htmlType="submit">Add</Button>
      </Form.Item>
    </Form>
  );
}
