import { useState, useEffect } from 'react';
import dayjs from 'dayjs'; // นำเข้า Day.js

export default function Clock() {
    const [time, setTime] = useState(dayjs()); // ใช้ dayjs แทน new Date()

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs()); // อัปเดตเวลาใหม่ทุก ๆ 1 วินาที
        }, 1000);

        return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
    }, []);

    return (
        <h2>
            It is {time.format('HH:mm:ss')} {/* ฟอร์แมตเวลาในรูปแบบชั่วโมง:นาที:วินาที */}
        </h2>
    );
}
