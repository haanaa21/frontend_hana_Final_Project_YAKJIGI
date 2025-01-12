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
    const fetchUserData = async () => {
        try {
            const response = await axios.get("/api/mybasicboardlog", {
                params: { userId },
            });
            console.log("서버 응답 데이터:", response.data); // 디버깅용 로그
            const formattedEvents = response.data.map((item) => ({
                id: item.dose_idx,
                title: item.medi_name,
                date: item.dose_date,
                extendedProps: {
                    post_num: item.post_num,
                },
            }));
            console.log("캘린더 이벤트 데이터:", formattedEvents); // 디버깅용 로그
            setEvents(formattedEvents);
        } catch (error) {
            console.error("데이터를 가져오는 중 오류가 발생했습니다", error);
        }
    };
    
    useEffect(() => {
        fetchUserData();
    }, []);

    // 날짜 클릭 이벤트 핸들러
    const dateClick = async (info) => {
        const selectedDate = info.dateStr; // 클릭한 날짜
        try {
            const response = await axios.get(`/api/mybasicboardlog/details`, {
                params: { date: selectedDate, userId },
            });

            const data = response.data;

            if (data && data.length > 0) {
                // 정보가 있으면 MybasicboardlogDetaile 페이지로 이동
                navigate(`/Mybasicboardlogdetaile`, { state: { date: selectedDate, userId } });
            } else {
                // 정보가 없으면 Mybasicboardlogwrite 페이지로 이동
                navigate(`/Mybasicboardlogwrite`, { state: { date: selectedDate, userId } });
            }
        } catch (error) {
            console.error("선택한 날짜에 대한 세부 정보를 가져오는 중 오류가 발생했습니다", error);
        }
    };

    // 약 이름 클릭 이벤트 핸들러
    const handleEventClick = async (clickInfo) => {
        const selectedDate = clickInfo.event.startStr;
        const postNum = clickInfo.event.extendedProps.post_num;
    
        console.log("Event clicked with params:", { date: selectedDate, userId, postNum });
    
        try {
            const response = await axios.get(`/api/mybasicboardlog/details`, {
                params: { date: selectedDate, userId, postNum },
            });
    
            const data = response.data;
    
            if (data) {
                console.log("Data received:", data);
                navigate(`/Mybasicboardlogdetaile`, { state: { date: selectedDate, data, postNum } });
            } else {
                console.warn("No data returned from API.");
            }
        } catch (error) {
            console.error("Failed to fetch event details:", error);
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