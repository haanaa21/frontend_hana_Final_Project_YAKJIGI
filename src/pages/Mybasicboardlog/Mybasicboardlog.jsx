import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "../../styles/mybasicboardlog/mybasicboardlog.module.css";
import { useNavigate } from "react-router-dom";

function Mybasicboardlog() {
    const [events, setEvents] = useState([
        { id: 1, title: "약 이름1", date: "2025-01-15" },
        { id: 2, title: "약 이름2", date: "2025-01-15" },
        { id: 3, title: "약 이름3", date: "2025-01-03" },
        { id: 4, title: "약 이름4", date: "2025-01-03" },
    ]);
    const navigate = useNavigate(); // React Router의 navigate 사용

    // 날짜 클릭 이벤트 핸들러
    const dateClick = (info) => {
        const selectedDate = info.dateStr; // 클릭한 날짜의 문자열 형식(YYYY-MM-DD)
        navigate(`/Mybasicboardlogwrite?date=${selectedDate}`); // URL 이동
    };

    // 약 이름 클릭 이벤트 핸들러
    const handleEventClick = (clickInfo) => {
        const { id, title, date } = clickInfo.event.extendedProps;
        navigate(`/Mybasicboardlogdetaile?id=${id}&title=${title}&date=${date}`); // URL에 데이터 포함
    };

    return (
        <div className={styles.mybasicboardlog__calendar__box}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today",
                    center: "title",
                    end: "prev,next",
                }}
                height={"85vh"}
                dateClick={dateClick} // 날짜 클릭 이벤트 핸들러 등록
                events={events} // 상태에서 이벤트 가져오기
                eventClick={handleEventClick} // 약 이름 클릭 이벤트 핸들러 등록
            />
        </div>
    );
}

export default Mybasicboardlog;