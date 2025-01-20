import './App.css';
import TransactionList from "./components/TransactionList"
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Divider } from 'antd';
import AddItem from './components/AddItem';
import { Spin, Typography } from 'antd';
import axios from 'axios'
import EditItem from './components/EditItem' // นำเข้า EditItem component

const URL_TXACTIONS = '/api/txactions'

function FinanceScreen() {
    const [summaryAmount, setSummaryAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [transactionData, setTransactionData] = useState([])
    const [editingItem, setEditingItem] = useState(null); // state สำหรับเก็บข้อมูลที่ต้องการแก้ไข

    const fetchItems = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(URL_TXACTIONS)
            setTransactionData(response.data.data.map(row => ({
                id: row.id,
                key: row.id,
                ...row.attributes
            })))
        } catch (err) {
            console.log(err)
        } finally { setIsLoading(false) }
    }

    const handleAddItem = async (item) => {
        try {
            setIsLoading(true)
            const params = { ...item, action_datetime: dayjs() }
            const response = await axios.post(URL_TXACTIONS, { data: params })
            const { id, attributes } = response.data.data
            setTransactionData([
                ...transactionData,
                { id: id, key: id, ...attributes }
            ])
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleNoteChanged = (id, note) => {
        setTransactionData(
            transactionData.map(transaction => {
                transaction.note = transaction.id === id ? note : transaction.note;
                return transaction
            })
        )
    }

    const handleRowDeleted = async (id) => {
        try {
            setIsLoading(true)
            await axios.delete(`${URL_TXACTIONS}/${id}`)
            fetchItems()
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    // ฟังก์ชันเปิด Modal สำหรับแก้ไขรายการ
    const handleEditClicked = (item) => {
        setEditingItem(item); // เมื่อคลิก Edit จะเก็บข้อมูลของ item ที่ต้องการแก้ไข
    }
    // ฟังก์ชันอัปเดตข้อมูลในเซิร์ฟเวอร์
    const updateItem = async (updatedItem) => {
        try {
            setIsLoading(true)
            await axios.put(`${URL_TXACTIONS}/${updatedItem.id}`, { data: updatedItem }) // ส่งข้อมูลที่แก้ไขไปยังเซิร์ฟเวอร์
            fetchItems(); // รีเฟรชรายการหลังจากอัปเดต
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }
    // ฟังก์ชันปิด Modal
    const handleCloseModal = () => {
        setEditingItem(null); // เมื่อปิด Modal ก็จะตั้งค่าข้อมูลเป็น null เพื่อปิด Modal
    };

    useEffect(() => {
        fetchItems()
    }, [])

    useEffect(() => {
        setSummaryAmount(transactionData.reduce(
            (sum, transaction) => (
                transaction.type === "income" ? sum + transaction.amount : sum - transaction.amount
            ), 0)
        )
    }, [transactionData])

    return (
        <div className="App">
            <header className="App-header">
                <Spin spinning={isLoading}>
                    <Typography.Title level={3}>
                        จำนวนเงินปัจจุบัน {summaryAmount} บาท
                    </Typography.Title><br />

                    <AddItem onItemAdded={handleAddItem} />
                    <Divider>บันทึก รายรับ - รายจ่าย</Divider>

                    <TransactionList
                        data={transactionData}
                        onNoteChanged={handleNoteChanged}
                        onRowDeleted={handleRowDeleted}
                        onEditClicked={handleEditClicked} />

                    {/* Modal สำหรับ Edit Item */}
                    {editingItem && (
                        <EditItem
                            item={editingItem}
                            isOpen={editingItem !== null} // ถ้ามีข้อมูลใน editingItem จะเปิด Modal
                            onItemEdited={updateItem} // ส่งฟังก์ชัน updateItem ไปที่ EditItem
                            onClose={handleCloseModal} // ฟังก์ชันปิด Modal
                        />
                    )}

                </Spin>
            </header>
        </div>
    );
}

export default FinanceScreen;
