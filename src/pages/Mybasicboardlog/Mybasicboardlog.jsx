import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import styles from "../../styles/mybasicboardlog/mybasicboardlog.module.css";
import { useNavigate } from "react-router-dom";

function Mybasicboardlog() {
    const [events, setEvents] = useState([]); // 캘린더 이벤트 상태
    const navigate = useNavigate(); // React Router의 navigate 사용
    const userId = "1111"; // 테스트용 하드코딩된 유저 ID

    // 페이지 로드 시 유저 ID로 데이터 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // 백엔드로 유저 ID를 포함한 요청을 보냄
                const response = await axios.get("/api/mybasicboardlog", {
                    params: { userId }, // 유저 ID 전달
                });
                // 데이터를 FullCalendar 이벤트 형식으로 변환
                const formattedEvents = response.data.map((item) => ({
                    id: item.dose_idx, // 고유 ID
                    title: item.medi_name, // 약 이름
                    date: item.dose_date, // 복용 날짜
                }));
                // 상태 업데이트
                setEvents(formattedEvents);
            } catch (error) {
                console.error("Error fetching user dose data:", error);
            }
        };

        fetchUserData();
    }, []);

    // 날짜 클릭 이벤트 핸들러
    const dateClick = (info) => {
        const selectedDate = info.dateStr; // 클릭한 날짜
        navigate(`/Mybasicboardlogwrite?date=${selectedDate}`); // URL 이동
    };

    // 약 이름 클릭 이벤트 핸들러
    const handleEventClick = async (clickInfo) => {
        const selectedDate = clickInfo.event.startStr; // 이벤트의 날짜 정보
        try {
            // 클릭한 날짜와 유저 ID로 상세 데이터 요청
            const response = await axios.get(`/api/mybasicboardlog/details`, {
                params: { date: selectedDate, userId }, // 유저 ID와 날짜 전달
            });

            const data = response.data;
            navigate(`/Mybasicboardlogdetaile`, { state: { date: selectedDate, data } });
        } catch (error) {
            console.error("Error fetching details for selected date:", error);
        }
    };


    return (
        <div className={styles.mybasicboardlog__calendar__box}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"} // 초기 보기 설정
                headerToolbar={{
                    start: "today",
                    center: "title",
                    end: "prev,next",
                }}
                height={"auto"} // 캘린더 높이
                dateClick={dateClick} // 날짜 클릭 이벤트
                events={events} // 캘린더에 표시할 이벤트 데이터
                eventClick={handleEventClick} // 약 이름 클릭 이벤트 핸들러 등록
                dayMaxEventRows={3} // 한 날짜에 최대 3개의 이벤트 표시
            />
        </div>
    );
}

export default Mybasicboardlog;