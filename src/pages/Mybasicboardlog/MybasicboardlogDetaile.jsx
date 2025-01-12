import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import board from "../../styles/boardcommon.module.css";
import boardlog from "../../styles/mypage/mybasicboardlogcommon.module.css";
import styles from "../../styles/mypage/mybasicboardlogdetaile.module.css";

function MybasicboardlogDetaile() {
    const [jsonData, setJsonData] = useState([]); // JSON 데이터
    const [doseData, setDoseData] = useState([]); // 복용 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const location = useLocation(); // 전달받은 데이터 가져오기
    const navigate = useNavigate();
    const { state } = location || {};
    const date = state?.date;
    const userId = state?.userId || "1111"; // 기본값 설정

    // 목록으로 돌아가는 버튼
    const BasicBoardLogListBtn = (event) => {
        event.preventDefault();
        window.location.href = "/mybasicboardlog";
    };

    // 수정 페이지 이동 버튼
    const BasicBoardLogUpdateBtn = (event) => {
        event.preventDefault();
        navigate('/mybasicboardlogedit', {
            state: {
                doseData, // 복용 데이터
                date, // 복용 일자
                userId, // 사용자 ID
                postNum: doseData[0]?.post_num || null, // post_num 전달
                doseOther: doseData[0]?.dose_other || "기타 내용 없음", // 기타 내용 전달
            },
        });
    };

    // 복용 데이터를 삭제하는 함수
    const handleDeleteClick = async () => {
        const confirmDelete = window.confirm("삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                await axios.delete("/api/mybasicboardlog", {
                    params: { userId, date },
                });
                alert("삭제되었습니다.");
                navigate(-1);
            } catch (error) {
                console.error("Error deleting dose data:", error);
                alert("삭제에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    // DB에서 복용 기록 가져오기
    useEffect(() => {
        const fetchDoseDetails = async () => {
            try {
                setLoading(true);
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

        if (date && userId) {
            fetchDoseDetails();
        }
    }, [date, userId]);

    // JSON 데이터와 복용 기록 매칭
    useEffect(() => {
        const fetchJsonData = async () => {
            try {
                const mediNames = doseData.map((item) => item.medi_name);
                console.log(mediNames.join(","))
                const response = await axios.get(
                    "/api/medi-data/match",
                    {
                        params: { mediNames: mediNames.join(",") },
                    }
                );
                setJsonData(response.data || []);
            } catch (err) {
                console.error("JSON 데이터를 가져오는데 실패했습니다:", err);
            }
        };

        if (doseData.length > 0) {
            fetchJsonData();
        }
    }, [doseData]);

    // 로딩 상태 처리
    if (loading) {
        return <div>Loading...</div>;
    }

    // 에러 상태 처리
    if (error) {
        return <div>{error}</div>;
    }

    // 복용 데이터가 없는 경우 처리
    if (doseData.length === 0) {
        return <div>데이터가 없습니다.</div>;
    }

    return (
        <>
            <div className={boardlog.boardlog__container}>
                <ul>
                    <li className={boardlog.boardlog__title}>복용일자</li>
                    <li className={boardlog.boardlog__contents}>
                        <em>{date}</em>
                    </li>
                    <li className={boardlog.boardlog__title}>복용 내용</li>
                    <li className={boardlog.boardlog__contents}>
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
                    <li className={boardlog.boardlog__title}>기타 내용</li>
                    <li className={boardlog.boardlog__contents}>
                        <p>{doseData[0]?.dose_other || "기타 내용 없음"}</p>
                    </li>
                    <li className={boardlog.boardlog__title}>사진 추가</li>
                    <li className={boardlog.boardlog__contents}>
                        {jsonData.length > 0 ? (
                            <div className={styles.detaile__img__box2}>
                                {jsonData.map((item, index) => (
                                    <div key={index} className={styles.detaile__img__item}>
                                        <img
                                            src={`http://localhost:8080/api/proxy/image?url=${encodeURIComponent(
                                                item.item_image
                                            )}`}
                                            alt={`${item.item_name} 이미지`}
                                            className={styles.detail__img}
                                        />
                                        <img />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>저장된 사진은 없습니다.</p>
                        )}
                    </li>
                </ul>
            </div>

            <div className={board.board_container}>
                <div className={board.detail_button_box}>
                    <button className={board.cancle} onClick={BasicBoardLogListBtn}>
                        목록
                    </button>
                    <span>
                        <button className={board.detail_write} onClick={BasicBoardLogUpdateBtn}>
                            수정
                        </button>
                        <button className={board.detail_delete} onClick={handleDeleteClick}>
                            삭제
                        </button>
                    </span>
                </div>
            </div>
        </>
    );
}

export default MybasicboardlogDetaile;