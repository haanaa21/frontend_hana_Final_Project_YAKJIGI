import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "../../styles/mybasicboardlog/mybasicboardlog.module.css";

// Mybasicboardlog 함수 정의
function Mybasicboardlog() {
    // 날짜 클릭 이벤트 핸들러
    const dateClick = (info) => {
        const selectedDate = info.dateStr; // 클릭한 날짜의 문자열 형식(YYYY-MM-DD)
        const targetUrl = `/Mybasicboardlogwrite?date=${selectedDate}`; // 쿼리 파라미터로 날짜 전달
        window.location.href = targetUrl; // URL 이동
    };
    // 이벤트 클릭 핸들러
    

    return (
        <>
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
                    events={[
                        { title: "약 이름1", date: "2024-12-15" },
                        { title: "약 이름2", date: "2024-12-15" },
                        { title: "약 이름3", date: "2024-12-03" },
                        { title: "약 이름4", date: "2024-12-03" }
                    ]}
                />
            </div>
        </>
    );
}

export default Mybasicboardlog;
