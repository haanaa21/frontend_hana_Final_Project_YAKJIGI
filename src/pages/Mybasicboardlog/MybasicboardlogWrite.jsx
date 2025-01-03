import React, { useState, useRef } from 'react';
import styles from '../../styles/mybasicboardlog/mybasicboardlogwrite.module.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import Editor from '../../components/Editor';
import { useLocation, useNavigate } from 'react-router-dom';


function Mybasicboardlogwrite(props) {
    const [startDate, setStartDate] = useState(null);
    const [fileName, setFileName] = useState('');
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const modalBackground = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();

    // URL에서 날짜 추출
    const query = new URLSearchParams(location.search);
    const date = query.get("date");

    // 모달 열기/닫기 함수
    const toggleModal = () => {
        setSearchModalOpen(prev => !prev);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    return (
        <>
        <div>
            {/* 검색 모달 */}
            {searchModalOpen && (
                <div
                    className={`${styles.write__modalContainer} ${searchModalOpen ? 'show' : ''}`}
                    ref={modalBackground}
                    onClick={(e) => {
                        if (e.target === modalBackground.current) {
                            setSearchModalOpen(false);
                        }
                    }}
                >
                    <div className={styles.write__modalContent__box}>
                        <ul className={styles.write__modal__search}>
                            <li>
                                약품명으로 검색하기
                            </li>
                            <li>
                                <button
                                className="material-icons"
                                onClick={() => setSearchModalOpen(false)}
                                >
                                close
                                </button>
                            </li>
                            </ul>
                            <ul className={styles.write__modal__search2}>
                            <li>
                                <input
                                    type="text"
                                    placeholder="약품명(품목명)을 입력하세요."
                                />
                            </li>
                            <li>
                                <button className={styles.write__search__modalbtn}>
                                    검색
                                </button>
                            </li>
                        </ul>
                        <div className={styles.write__table}>
                            <table>
                                <colgroup>
                                    <col width="25%"/>
                                    <col width="25%"/>
                                    <col width="25%"/>
                                    <col width="25%"/>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>약품명 (품목명)</th>
                                        <th>업체명</th>
                                        <th>제품일련번호</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>번호</td>
                                        <td>이름</td>
                                        <td>타이틀</td>
                                        <td>타이틀</td>
                                    </tr>
                                    <tr>
                                        <td>번호</td>
                                        <td>이름</td>
                                        <td>타이틀</td>
                                        <td>타이틀</td>
                                    </tr>
                                    <tr>
                                        <td>번호</td>
                                        <td>이름</td>
                                        <td>타이틀</td>
                                        <td>타이틀</td>
                                    </tr>
                                    <tr>
                                        <td>번호</td>
                                        <td>이름</td>
                                        <td>타이틀</td>
                                        <td>타이틀</td>
                                    </tr>
                                    <tr>
                                        <td>번호</td>
                                        <td>이름</td>
                                        <td>타이틀</td>
                                        <td>타이틀</td>
                                    </tr>
                                    <tr>
                                        <td>번호</td>
                                        <td>이름</td>
                                        <td>타이틀</td>
                                        <td>타이틀</td>
                                    </tr>
                                    <tr>
                                        <td>번호</td>
                                        <td>이름</td>
                                        <td>타이틀</td>
                                        <td>타이틀</td>
                                    </tr>
                                    <tr>
                                        <td>번호</td>
                                        <td>이름</td>
                                        <td>타이틀</td>
                                        <td>타이틀</td>
                                    </tr>
                                    <tr>
                                        <td>번호</td>
                                        <td>이름</td>
                                        <td>타이틀</td>
                                        <td>타이틀</td>
                                    </tr>
                                    <tr>
                                        <td>번호</td>
                                        <td>이름</td>
                                        <td>타이틀</td>
                                        <td>타이틀</td>
                                    </tr>
                                    <tr>
                                        <td>번호</td>
                                        <td>이름</td>
                                        <td>타이틀</td>
                                        <td>타이틀</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>

        <div className={styles.write__container}>
            <div className={styles.write__date__container__box}>
            <ul>
                <li>복용일자</li>
                <li>
                    <div className={styles.write__date__container}>
                        <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy/MM/dd"
                        placeholderText={date}
                        onChangeRaw={(e) => e.preventDefault()}
                        />
                        <span className="material-icons">calendar_month</span>
                    </div>
                </li>
                <li>약 이름</li>
                <li>
                    <form className={styles.write__search__form}>
                        <div className={styles.write__search__container}>
                            <input
                                type="text"
                                placeholder="약 이름 검색하기"
                            />
                            <div>
                            <button
                                className={styles.write__search__btn}
                                onClick={(e) => {
                                    e.preventDefault();  // 폼 제출을 방지
                                    setSearchModalOpen(true); // 검색 모달 열기
                                }}
                            >
                                검색
                            </button>
                            </div>
                        </div>
                    </form>
                </li>
                <li>복용 방법</li>
                <li>
                <div className={styles.write__search__container}>
                    <form className={styles.write__search__form}>
                    <input type="text" placeholder="하루 1알" />
                    </form>
                </div>
                </li>
                <li>사용 목적</li>
                <li>
                <div className={styles.write__search__container}>
                    <form className={styles.write__search__form}>
                    <input type="text" placeholder="당뇨" />
                    </form>
                </div>
                </li>
                <li>기타 내용</li>
                <li>
                <Editor />
                </li>
                <li>사진 추가</li>
                <li>
                <div className={styles.filebox}>
                    <input
                    className={styles.uploadName}
                    value={fileName}
                    placeholder="파일찾기를 클릭해서 첨부파일을 등록해주세요."
                    readOnly
                    />
                    <div className={styles.filebox__label}>
                    <label htmlFor="file">파일찾기</label>
                    </div>
                    <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    />
                </div>
                </li>
            </ul>
            </div>
            <div className={styles.write__btn__container}>
            <ul className={styles.write__btn__ul}>
                <li>
                <button className={styles.write__ok__btn}>완료</button>
                </li>
                <li>
                <button className={styles.write__no__btn}>취소</button>
                </li>
            </ul>
            </div>
        </div>
        </>
    );
}

export default Mybasicboardlogwrite;