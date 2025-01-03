import React, { useEffect, useState } from "react";
import styles from "../../styles/mybasicboardlog/mybasicboardlogdetaile.module.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function MybasicboardlogDetaile() {
    const [doseData, setDoseData] = useState([]); // 복용 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const location = useLocation(); // 전달받은 데이터 가져오기
    const navigate = useNavigate();
    const { state } = location || {};
    const date = state?.date;
    const userId = state?.userId || "1111"; // 기본값 설정

    // 페이지 로드 시 해당 날짜와 유저 ID로 데이터 가져오기
    useEffect(() => {
        console.log("전달된 userId:", userId);
        console.log("전달된 date:", date);

        if (date && userId) {
            const fetchDoseDetails = async () => {
                
                setLoading(true);
                setError(null);

                try {
                    const response = await axios.get("/api/mybasicboardlog/details", {
                        params: { date, userId },
                    });
                    setDoseData(response.data || []);
                } catch (err) {
                    setError("데이터를 불러오는데 실패했습니다.");
                } finally {
                    setLoading(false);
                }
            };

            fetchDoseDetails();
        }
    }, [date, userId]); // useEffect 종속성 배열에 date와 userId 추가

    const handleEditClick = () => { // 수정 버튼
        navigate(`/MybasicboardlogEdit`, { state: { userId, date } });
    };

    const handleDeleteClick = async () => { // 삭제 버튼
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                // 삭제 요청
                await axios.delete("/api/mybasicboardlog", {
                    params: { userId, date },
                });
                alert("삭제되었습니다.");
                navigate(-1); // 이전 화면으로 이동
            } catch (error) {
                console.error("Error deleting dose data:", error);
                alert("삭제에 실패했습니다. 다시 시도해주세요.");
            }
        } else {
            console.log("삭제가 취소되었습니다.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (doseData.length === 0) {
        return <div>데이터가 없습니다.</div>;
    }

    return (
        <>
            <div className={styles.detaile__container}>
                <div className={styles.detaile__data__box}>
                    <ul>
                        <li>복용일자</li>
                        <li>
                            <em>{date}</em>
                        </li>
                    </ul>
                </div>
                <div className={styles.detaile__table__box}>
                    <ul>
                        <li className={styles.detaile__table__title}>복용 내용</li>
                        <li>
                            <div className={styles.table}>
                                <table className={styles.status__table}>
                                    <thead>
                                        <tr>
                                            <th>약 이름</th>
                                            <th>복용 방법</th>
                                            <th>사용 목적</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {doseData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.medi_name}</td>
                                                <td>{item.dose_way}</td>
                                                <td>{item.dose_purpose}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </li>
                    </ul>
            </div>
            <div className={styles.detaile__content__box}>
                <ul>
                    <li className={styles.detaile__content__title}>기타 내용</li>
                    <li>
                        <p>{doseData[0]?.dose_other || "기타 내용 없음"}</p>
                    </li>
                </ul>
            </div>
                <div className={styles.detaile__img__box}>
                    <ul>
                        <li className={styles.detaile__img__title}>사진 추가</li>
                        <li>
                            <div className={styles.detaile__img__box2}>
                                <div className={styles.detaile__img__item}>
                                    <img
                                        src="./images/sub4-3/cat01.png"
                                        alt="사진"
                                        className={styles.detail__img}
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={styles.detaile__btn__box}>
                <ul>
                    <li>
                        <button className={styles.detaile__list__btn}
                        onClick={() => navigate(-1)} // 뒤로가기
                        >목록</button>
                    </li>
                    <li>
                        <button className={styles.detaile__ok__btn} onClick={handleEditClick}>수정</button>
                        <button className={styles.detaile__delete__btn} onClick={handleDeleteClick}>삭제</button>
                    </li>
                </ul>
                </div>
            </div>
        </>
    );
}

export default MybasicboardlogDetaile;