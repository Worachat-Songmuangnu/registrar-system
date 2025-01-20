import React from 'react';
import { Table, Input, Button, Space, Tag, Popconfirm, Modal } from 'antd';
import { DeleteOutlined, BugOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'; // นำเข้า Day.js

export default function TransactionList(props) {
  const columns = [
    {
      title: 'Date-Time', // ชื่อคอลัมน์
      dataIndex: 'action_datetime', // ระบุฟิลด์ในข้อมูล
      key: 'action_datetime',
      render: (_, record) => dayjs(record.action_datetime).format("DD/MM/YYYY - HH:mm"),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (_, record) => (
        <Tag color={record.type === "income" ? 'green' : 'red'}>{record.type}</Tag>
      ), // กำหนดสีตามประเภท
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      render: (_, record) => (
        <Input
          value={record.note}
          onChange={(evt) =>
            props.onNoteChanged(record.id, evt.target.value)
          }
        />
      ), // ใส่ช่อง Input เพื่อแก้ไขหมายเหตุ
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => props.onEditClicked(record)} />
          <Popconfirm
            title="Delete the transaction"
            description="Are you sure to delete this transaction?"
            onConfirm={() => props.onRowDeleted(record.id)}
          >
            <Button danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ), // ใส่ปุ่ม Delete
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={props.data}
      rowKey="id" // ระบุฟิลด์ที่ใช้เป็น key
      pagination={{ pageSize: 5 }} // แบ่งหน้า 5 แถวต่อหน้า
      bordered
    />
  );
}
