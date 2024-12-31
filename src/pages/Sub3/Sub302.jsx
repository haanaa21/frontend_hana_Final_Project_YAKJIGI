import React, { useState } from 'react';
import axios from 'axios';

import commons from '../../styles/common.module.css';
import styles from '../../styles/sub3/sub302.module.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function Sub302(props) {
   const { mainTitle, subTitle } = useDocumentTitle();
   
   const [query, setQuery] = useState('');  // 검색어 상태
   const [results, setResults] = useState([]);  // 검색 결과 상태
   
   const handleSearch = async (event) => {
      event.preventDefault();  // 폼 제출 방지
      try {
         const response = await axios.get('/api/addresses/search', {
            params: { detail: query }
         });
         setResults(response.data);  // API 응답 데이터 저장
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };
   
   return (
      <>
         <div className={commons.container__box__title}>
            <h2 className={commons.main_title}>{mainTitle}</h2>
            <p className={commons.sub_title}>{subTitle}</p>
         </div>
         
         {/* 검색바 */}
         <ul className={commons.common_search_container}>
            <li>
               <p>검색어 검색</p>
               <div className={commons.common_search_div}>
                  <form onSubmit={handleSearch}>
                     <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="검색어를 입력해주세요."
                     />
                     <button type="submit" className="material-icons">search</button>
                  </form>
               </div>
            </li>
         </ul>
         
         {/* 검색 결과 */}
         <div className={styles.content_container}>
            <div className={styles.list_section}> 
               {results.length > 0 ? (
                  <ul>
                     {results.map((item, index) => (
                        <li key={index}>
                           <p>{item.boxAddressCity} {item.boxAddressTown} {item.boxAddress}</p>
                        </li>
                     ))}
                  </ul>
               ) : (
                  <p>검색 결과가 없습니다.</p>
               )}
            </div>
         </div>
      </>
   );
}

export default Sub302;