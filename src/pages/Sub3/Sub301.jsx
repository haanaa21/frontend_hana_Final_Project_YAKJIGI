import React from 'react';
import '../../styles/sub3/sub301.css';

function Sub301(props) {
    return (
        <>
            <div className='sub_container1'>
                    <h2 className="great_title">약국 찾아보기</h2>
                    <p className="subheading_title">
                    약국명 혹은 상세주소를 검색하시면, 약국의 주소를 알려드립니다
                    </p>
                    </div>
            {/* 검색바 */}
            <ul className="sub_search_container">
                <li className="sub_search">
                    <div className='cearch_box'>
                        <p className="sub_search_text">초성 검색</p>
                        <div className="sub_search_div">
                            <form name='sub301__form' action="/">
                            <input
                                type="text"
                                name=""
                                id=""
                                placeholder="지역명을 입력하세요 (예시 : 동대문, 일산)"
                            />
                            <button className="material-icons">search</button>
                        </form>
                        </div>
                    </div>
                </li>
            </ul>
            <div className="sub_container2">
            <ul className="contents_box">
                <li className="textcenter">
        {/* 검색바 */}
            <div>
                <ul className="result_bar">
                    <li>총 <span>236</span>개의 결과가 있습니다.</li>
                </ul>
            </div>
            <div className="table">
        <table className="status_table">
            <thead>
            <tr>
                <th>약국명</th>
                <th>주소</th>
                <th>연락처</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1번약국</td>
                <td>1번약국 주소</td>
                <td>1번약국 연락처</td>
            </tr>
                <tr>
                <td>2번약국</td>
                <td>2번약국 주소</td>
                <td>2번약국 연락처</td>
            </tr>
            <tr>
                <td>3번약국</td>
                <td>3번약국 주소</td>
                <td>3번약국 연락처</td>
            </tr>
            <tr>
                <td>4번약국</td>
                <td>4번약국 주소</td>
                <td>4번약국 연락처</td>
            </tr>
            <tr>
                <td>5번약국</td>
                <td>5번약국 주소</td>
                <td>5번약국 연락처</td>
            </tr>
            <tr>
                <td>6번약국</td>
                <td>6번약국 주소</td>
                <td>6번약국 연락처</td>
            </tr>
            <tr>
                <td>7번약국</td>
                <td>7번약국 주소</td>
                <td>7번약국 연락처</td>
            </tr>
            <tr>
                <td>8번약국</td>
                <td>8번약국 주소</td>
                <td>8번약국 연락처</td>
            </tr>
            <tr>
                <td>9번약국</td>
                <td>9번약국 주소</td>
                <td>9번약국 연락처</td>
            </tr>
            <tr>
                <td>10번약국</td>
                <td>10번약국 주소</td>
                <td>10번약국 연락처</td>
            </tr>
            </tbody>
        </table>
        </div>
        {/* paging 영역 start */}
        <div>
        <ul className="paging_num_ul">
            <li className="material-icons prev">keyboard_double_arrow_left</li>
            <li className="material-icons prev">chevron_left</li>
            <li className="active">1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li className="material-icons next">chevron_right</li>
            <li className="material-icons next">keyboard_double_arrow_right</li>
        </ul>
        </div>
        {/* paging 영역 end */}
    </li>
    </ul>
</div>
        </>
    );
}

export default Sub301;