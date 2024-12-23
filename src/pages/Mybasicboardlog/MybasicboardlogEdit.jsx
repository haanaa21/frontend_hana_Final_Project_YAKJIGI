import React, { useState, useRef } from 'react';
import styles from '../../styles/mybasicboardlog/mybasicboardlogedit.module.css';


function MybasicboardlogEdit(props) {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };

    return (
        <>
            <div className={styles.edit__container}>

                <div className={styles.edit__data__box}>
                    <ul>
                        <li>복용일자</li>
                        <li>
                            <em>2004-12-16</em>
                        </li>
                    </ul>
                </div>
                <div className={styles.edit__table__box}>
                <ul>
                    <li className={styles.edit__table__title}>복용 내용</li>
                    <li>
                        <div className={styles.table}>
                        <table className={styles.status_table}>
                            <thead>
                                <tr>
                                    <th>약 이름</th>
                                    <th>복용 방법</th>
                                    <th>사용 목적</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>카르베딜롤정제</td>
                                    <td>하루 1알</td>
                                    <td>당뇨</td>
                                </tr>
                                <tr>
                                    <td>카르베딜롤정제</td>
                                    <td>하루 1알</td>
                                    <td>당뇨</td>
                                </tr>
                                <tr>
                                    <td>카르베딜롤정제</td>
                                    <td>하루 1알</td>
                                    <td>당뇨</td>
                                </tr>
                                <tr>
                                    <td>카르베딜롤정제</td>
                                    <td>하루 1알</td>
                                    <td>당뇨</td>
                                </tr>
                                <tr>
                                    <td>카르베딜롤정제</td>
                                    <td>하루 1알</td>
                                    <td>당뇨</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={styles.edit__content__box}>
                <ul>
                    <li className={styles.edit__content__title}>기타 내용</li>
                    <li>
                        <p>내용 입니다. 내용 입니다. 내용 입니다.</p>
                    </li>
                </ul>
                    </div>
                    <div className={styles.edit__img__box}>
                    <ul>
                    <li className={styles.edit__img__title}>사진 추가</li>
                    <li>
                        <div className={styles.edit__img__box2}>
                            <div className={styles.edit__img__item}>
                                <button className={styles.edit__img__btn}>-</button>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.edit__img}
                                />
                            </div>
                            <div className={styles.edit__img__item}>
                                <button className={styles.edit__img__btn}>-</button>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.edit__img}
                                />
                            </div>
                            <div className={styles.edit__img__item}>
                                <button className={styles.edit__img__btn}>-</button>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.edit__img}
                                />
                            </div>
                            <div className={styles.edit__img__item}>
                                <button className={styles.edit__img__btn}>-</button>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.edit__img}
                                />
                            </div>
                            <div className={styles.edit__img__item}>
                                <button className={styles.edit__img__btn}>-</button>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.edit__img}
                                />
                            </div>
                            <div className={styles.edit__img__item}>
                                <button className={styles.edit__img__btn}>-</button>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.edit__img}
                                />
                            </div>
                            <div className={styles.edit__img__item}>
                                <button className={styles.edit__img__btn}>-</button>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.edit__img}
                                />
                            </div>
                            
                        </div>
                    </li>
                </ul>
                </div>
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
                <div className={styles.edit_btn__box}>
                <ul>
                    <li>
                            <button className={styles.edit__ok__btn}>저장</button>
                        </li>
                        <li>
                            <button className={styles.edit__no__btn}>취소</button>
                        </li>
                </ul>
                </div>
            </div>
        </>
    );
}

export default MybasicboardlogEdit;