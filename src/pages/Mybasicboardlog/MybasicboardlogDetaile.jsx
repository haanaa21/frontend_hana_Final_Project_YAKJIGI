import React from 'react';
import styles from '../../styles/mybasicboardlog/mybasicboardlogdetaile.module.css';

function MybasicboardlogDetaile(props) {
    return (
        <>
            <div className={styles.detaile__container}>

                <div className={styles.detaile__data__box}>
                    <ul>
                        <li>복용일자</li>
                        <li>
                            <em>2004-12-16</em>
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
            <div className={styles.detaile__content__box}>
                <ul>
                    <li className={styles.detaile__content__title}>기타 내용</li>
                    <li>
                        <p>내용 입니다. 내용 입니다. 내용 입니다.</p>
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
                            <div className={styles.detaile__img__item}>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.detail__img}
                                />
                            </div>
                            <div className={styles.detaile__img__item}>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.detail__img}
                                />
                            </div>
                            <div className={styles.detaile__img__item}>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.detail__img}
                                />
                            </div>
                            <div className={styles.detaile__img__item}>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.detail__img}
                                />
                            </div>
                            <div className={styles.detaile__img__item}>
                                <img
                                    src="./images/sub4-3/cat01.png"
                                    alt="사진"
                                    className={styles.detail__img}
                                />
                            </div>
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
                        <button className={styles.detaile__list__btn}>목록</button>
                    </li>
                    <li>
                        <button className={styles.detaile__ok__btn}>수정</button>
                        <button className={styles.detaile__delete__btn}>삭제</button>
                    </li>
                </ul>
                </div>
            </div>
        </>
    );
}

export default MybasicboardlogDetaile;