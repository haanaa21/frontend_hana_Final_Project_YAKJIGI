import commons from '../../styles/common.module.css';
import boardlog from '../../styles/mypage/mybasicboardlogcommon.module.css';
import MyBasicMenu from '../../components/MyBasicMenu';
import styles from '../../styles/mypage/mybasicboardlogedit.module.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Editor from "../../components/Editor";

function MybasicboardlogEdit(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location || {};
    const doseData = state?.doseData || [];
    const date = state?.date || null;
    const userId = state?.userId || null;
    const { mainTitle, subTitle } = useDocumentTitle();
    const [startDate, setStartDate] = useState(date); // 전달된 date를 초기값으로 설정
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const modalBackground = useRef(null);
    const [allChecked, setAllChecked] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태 추가
    const [filteredCheckboxes, setFilteredCheckboxes] = useState([]); // 필터된 체크박스 상태 추가
    const [checkboxes, setCheckboxes] = useState([]); // 초기값 빈 배열로 설정
    const [isLoading, setIsLoading] = useState(false);
    const [inputValues, setInputValues] = useState({ dosageMethod: '', usagePurpose: '' }); // 추가
    const [otherDetails, setOtherDetails] = useState('');

    // 상태 초기화
    const [selectedItems, setSelectedItems] = useState(
        doseData.map(item => ({
            name: item.medi_name,
            dosageMethod: item.dose_way,
            usagePurpose: item.dose_purpose
        }))
    );

    const resetCheckboxes = () => {
        setCheckboxes((prev) => prev.map((checkbox) => ({ ...checkbox, checked: false })));
        setFilteredCheckboxes([]); // 검색 결과 초기화
        setAllChecked(false); // 전체 체크박스 초기화
    };

    // 모달 열릴 때 JSON 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            if (searchModalOpen) {
                setIsLoading(true);
                try {
                    const response = await axios.get("/api/medi-data/all"); // API 호출
                    const fetchedData = response.data;

                    const updatedCheckboxes = fetchedData.slice(0, 50).map((item, index) => ({
                        id: index + 1,
                        label: item.item_name,
                        checked: false,
                        companyName: item.entp_name,
                        productSerialNumber: item.item_seq,
                    }));

                    setCheckboxes(updatedCheckboxes); // 상태 업데이트
                } catch (error) {
                    console.error("JSON 데이터를 가져오는 중 오류가 발생했습니다:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [searchModalOpen]);

    // 모달 열릴 때 body 스크롤 막기
    useEffect(() => {
        document.body.style.overflow = searchModalOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [searchModalOpen]);

    // 체크박스 상태 업데이트 함수
    const handleCheckboxChange = (id) => {
        setCheckboxes((prev) =>
            prev.map((checkbox) =>
                checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
            )
        );
        setFilteredCheckboxes((prev) =>
            prev.map((checkbox) =>
                checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
            )
        );
    };

    // 전체 선택/해제 함수
    const handleAllCheckboxChange = () => {
        const newCheckedState = !allChecked;
        setAllChecked(newCheckedState);

        setCheckboxes((prev) =>
            prev.map((checkbox) => ({ ...checkbox, checked: newCheckedState }))
        );
        setFilteredCheckboxes((prev) =>
            prev.map((checkbox) => ({ ...checkbox, checked: newCheckedState }))
        );
    };

    // 입력 필드 상태 업데이트
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // 항목 추가
    const handleConfirm = () => {
        const isAnyCheckboxChecked = checkboxes.some((checkbox) => checkbox.checked);
        if (!isAnyCheckboxChecked || !inputValues.dosageMethod || !inputValues.usagePurpose) {
            alert('복용 방법, 사용 목적, 그리고 체크박스는 필수입니다.');
            return;
        }

        const selected = checkboxes.filter((checkbox) => checkbox.checked);
        const newItems = selected.map((item) => ({
            name: item.label,
            dosageMethod: inputValues.dosageMethod,
            usagePurpose: inputValues.usagePurpose,
        }));

        setSelectedItems((prev) => {
            const updatedItems = [...prev, ...newItems];
            return updatedItems.filter(
                (item, index, self) => self.findIndex((i) => i.name === item.name) === index
            );
        });

        setSearchModalOpen(false); // 모달 닫기
        resetCheckboxes(); // 상태 초기화
    };

    // 항목 삭제
    const handleRemoveItem = (index) => {
        setSelectedItems((prev) => prev.filter((_, i) => i !== index));
    };

    // 전체 항목 삭제
    const handleRemoveAllItems = () => {
        setSelectedItems([]);
        resetCheckboxes(); // 상태 초기화
    };

    // otherDetails가 빈 문자열일 경우 기본값 설정
    const otherDetailsWithDefault = otherDetails.trim() === "" ? "기타 내용 없음" : otherDetails;

    const handleSearch = () => {
        if (searchKeyword.trim() === "") {
            alert("검색어를 입력하세요.");
            return;
        }

        const filteredData = checkboxes.filter((checkbox) =>
            checkbox.label.includes(searchKeyword) ||
            checkbox.companyName.includes(searchKeyword)
        );

        if (filteredData.length === 0) {
            alert("검색 결과가 없습니다.");
        } else {
            setFilteredCheckboxes(filteredData);
        }
    };

    const BasicBoardLogListBtn = (e) => {
        e.preventDefault();
        navigate('/mybasicboardlog'); // 수정
    };

    // 수정 버튼 클릭 시
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!startDate || selectedItems.length === 0) {
            alert("복용 날짜와 약물 데이터를 추가하세요.");
            return;
        }

        try {
            const payload = {
                user_idx: userId,
                dose_date: startDate,
                dose_other: otherDetails.trim() || "기타 내용 없음",
                medications: selectedItems.map((item) => ({
                    medi_name: item.name,
                    dose_way: item.dosageMethod,
                    dose_purpose: item.usagePurpose,
                })),
            };

            const response = await axios.put("/api/mybasicboardlog/edit", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                alert("수정이 완료되었습니다.");
                navigate("/mybasicboardlog");
            } else {
                alert(`수정 실패: 서버 응답 상태 ${response.status}`);
            }
        } catch (error) {
            console.error("수정 중 오류 발생:", error);
            alert("수정에 실패했습니다. 다시 시도해주세요.");
        }
    };
    
    return (
        <>
            <div>
                {/* 검색 모달 */}
                {searchModalOpen && (
                <div
                    className={`${boardlog.write__modalContainer} ${searchModalOpen ? 'show' : ''}`}
                        ref={modalBackground}
                        onClick={(e) => {
                            if (e.target === modalBackground.current) {
                            setSearchModalOpen(false);
                            }
                    }}
                >
                <div className={boardlog.write__modalContent__box}>
                    <ul className={boardlog.write__modal__search}>
                        <li>약품명으로 검색하기</li>
                        <li>
                            <button
                            className="material-icons"
                            onClick={() => setSearchModalOpen(false)}
                            >
                            close
                            </button>
                        </li>
                    </ul>
                    <ul className={boardlog.write__search}>
                        <li>
                            <input
                            type="text"
                            placeholder="약품명(품목명)을 입력하세요."
                            value={searchKeyword} // 키워드 상태와 연결
                            onChange={(e) => setSearchKeyword(e.target.value)} // 키워드 업데이트
                            />
                            
                            <button className={boardlog.write__search__modalbtn}
                            onClick={handleSearch}>
                            검색
                            </button>
                        </li>
                    </ul>
                    <ul className={boardlog.write__search2}>
                        <li>
                            <span className={boardlog.write__search__modalbtn2}>
                            복용 방법 <span className={boardlog.star}>*</span>
                            </span>

                            <input
                            type="text"
                            name="dosageMethod"
                            placeholder="복용 방법"
                            value={inputValues.dosageMethod}
                            onChange={handleInputChange}
                            />
                        </li>
                    </ul>
                    <ul className={boardlog.write__search2}>
                        <li>
                            <span className={boardlog.write__search__modalbtn2}>
                            사용 목적 <span className={boardlog.star}>*</span>
                            </span>

                            <input
                            type="text"
                            name="usagePurpose"
                            placeholder="사용 목적"
                            value={inputValues.usagePurpose}
                            onChange={handleInputChange}
                            />
                        </li>
                    </ul>
                        <div className={styles.table}>
                            <table className={styles.status__table}>
                            <thead>
                                <tr>
                                        <th>
                                        <input
                                            type="checkbox"
                                            checked={allChecked}
                                            onChange={handleAllCheckboxChange}
                                        />
                                        </th>
                                        <th>No</th>
                                        <th>약품명 (품목명)</th>
                                        <th>업체명</th>
                                        <th>제품일련번호</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(filteredCheckboxes.length > 0 ? filteredCheckboxes : checkboxes).map((checkbox, index) => (
                                    <tr key={checkbox.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={checkbox.checked} // 체크 상태 반영
                                                onChange={() => handleCheckboxChange(checkbox.id)} // 상태 업데이트
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{checkbox.label}</td>
                                        <td>{checkbox.companyName}</td> {/* 업체명 추가 */}
                                        <td>{checkbox.productSerialNumber}</td> {/* 제품일련번호 추가 */}
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        <button className={boardlog.confirmbtn} onClick={handleConfirm}>확인</button>
                    </div>
                </div>
                )}
            </div>

            {/* <div className={commons.container__box__title}>
                <h2 className={commons.main_title}>{mainTitle}</h2>
                <p className={commons.sub_title}>{subTitle}</p>
            </div> */}

            {/* 마이 페이지 메뉴 */}
            <MyBasicMenu />

            <div className={boardlog.boardlog__container}>
                <ul>
                <li className={boardlog.boardlog__title}>
                    복용일자
                </li>
                <li className={boardlog.boardlog__contents}>
                    <div className={boardlog.boardlog__date__calendar}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="YYYY-MM-DD"
                            onChangeRaw={(e) => e.preventDefault()}
                            className={boardlog.boardlog__date__calendar__input}
                        />
                        <span className="material-icons">calendar_month</span>
                    </div>
                </li>
                <li className={boardlog.boardlog__title}>
                    <p>복용 내용</p>
                </li>
                <li className={boardlog.boardlog__contents}>
                    <div className={boardlog.write__search__container}>
                        <input
                            type="text"
                            placeholder="검색하기를 클릭하세요"
                            readOnly
                            />
                        <div>
                            <button
                            className={boardlog.write__search__btn}
                            onClick={(e) => {
                                e.preventDefault();  // 폼 제출을 방지   
                                setSearchModalOpen(true);
                            }}
                            >
                            검색
                            </button>
                        </div>
                    </div>
                    <div className="selected-items">
                        <ul>
                            {selectedItems.map(item => (
                                <li key={item.id}>{item.label}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.table}>
                        <table className={styles.statusupdate__table}>
                            <thead>
                            <tr>
                                <th>약 이름</th>
                                <th>복용 방법</th>
                                <th>사용 목적</th>
                                <th>
                                    <span onClick={handleRemoveAllItems}>전체삭제</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                {selectedItems.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center' }}>
                                            복용 데이터를 추가하세요.
                                        </td>
                                    </tr>
                                ) : (
                                    selectedItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.dosageMethod}</td>
                                            <td>{item.usagePurpose}</td>
                                            <td>
                                                <button onClick={() => handleRemoveItem(index)}>
                                                    <span className="material-symbols-outlined">remove</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </li>
                <li className={boardlog.boardlog__title}>
                    기타 내용
                </li>
                <li className={boardlog.boardlog__contents}>
                    <Editor
                        data={otherDetails} // CKEditor의 초기값 설정
                        onChange={setOtherDetails}
                    />
                </li>
                </ul>
            </div>

            <div className={boardlog.write_button_box}>                
                <div>
                <button className={boardlog.board_write} onClick={handleSubmit}>수정</button>    
                <button className={boardlog.board_cancle} onClick={BasicBoardLogListBtn}>목록</button>    
                </div>
            </div>

            
        </>
    );
}

export default MybasicboardlogEdit;