import React, { useEffect, useState } from "react";
import commons from "../../styles/common.module.css";
import styles from "../../styles/sub3/sub303.module.css";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import axios from "axios";

function Sub303() {
   const { mainTitle, subTitle } = useDocumentTitle(); // 페이지 제목과 부제목을 설정하는 커스텀 훅
   const [isMapLoaded, setIsMapLoaded] = useState(false); // 카카오 맵이 로드되었는지 여부
   const [cities, setCities] = useState([]); // 선택 가능한 도시 목록
   const [towns, setTowns] = useState([]); // 선택 가능한 구/군 목록
   const [selectedCity, setSelectedCity] = useState(""); // 사용자가 선택한 도시
   const [selectedTown, setSelectedTown] = useState(""); // 사용자가 선택한 구/군
   const [keyword, setKeyword] = useState(""); // 사용자가 입력한 검색어
   const [map, setMap] = useState(null); // 카카오 맵 인스턴스
   const [markers, setMarkers] = useState([]); // 지도에 표시된 마커들
   const [hasSearched, setHasSearched] = useState(false); // 검색 버튼 클릭 여부

   // 지도에 마커 추가 및 갱신
   const handleSearch = async (e) => {
      e.preventDefault(); // 버튼 클릭 시 페이지 리로드 방지

      if (!window.kakao || !window.kakao.maps) {
         console.error("카카오 맵 API가 로드되지 않음");
         return;
      }

      try {
         const response = await axios.get("/api/getCityCoordinates", {
            params: {
               city: selectedCity,
               town: selectedTown || "", // 선택된 구/군 값을 전달 (없으면 빈 문자열)
               keyword: keyword.trim() || "", // 검색어 전달 (없으면 빈 문자열)
            },
         });

         if (response.data) {
            const coordinates = response.data; // API 응답에서 좌표 데이터 가져오기
            console.log("Coordinates:", coordinates);

            // 기존 마커 제거
            markers.forEach((marker) => marker.setMap(null));

            // 새 마커 생성 및 지도에 추가
            const newMarkers = coordinates.map((coord) => {
               const position = new window.kakao.maps.LatLng(coord.lat, coord.lng); // lat, lng 사용
               const marker = new window.kakao.maps.Marker({ position });
               marker.setMap(map); // 지도에 마커 추가
               return marker;
            });
            setMarkers(newMarkers);

            // 지도 범위 설정
            if (coordinates.length > 0) {
               const bounds = new window.kakao.maps.LatLngBounds();
               coordinates.forEach((coord) => {
                  bounds.extend(new window.kakao.maps.LatLng(coord.lat, coord.lng));
               });
               map.setBounds(bounds);
            }

            // 검색 상태 업데이트
            setHasSearched(true);
         }
      } catch (error) {
         console.error("도시 좌표를 가져오는 중 오류 발생", error);
      }
   };

   // 카카오 맵 로드 확인
   useEffect(() => {
      const checkKakaoMaps = () => {
         if (window.kakao && window.kakao.maps) {
            setIsMapLoaded(true);
         } else {
            setTimeout(checkKakaoMaps, 100);
         }
      };
      checkKakaoMaps();
   }, []);

   // 도시 목록 가져오기
   useEffect(() => {
      const fetchCities = async () => {
         try {
            const response = await axios.get("/api/getCities");
            if (response.data) {
               setCities(response.data); // City 데이터를 상태에 저장
            }
         } catch (error) {
            console.error("Error fetching cities:", error);
         }
      };
      fetchCities();
   }, []);

   // 선택한 도시의 구/군 목록 가져오기
   const fetchTowns = async (city) => {
      try {
         const response = await axios.get(`/api/getTowns?city=${city}`); // 선택한 도시를 파라미터로 API 호출
         if (response.data) {
            const uniqueTowns = [...new Set(response.data.map((town) => town))]; // 중복 제거
            setTowns(uniqueTowns); // 구/군 목록 업데이트
         }
      } catch (error) {
         console.error("Error fetching towns:", error);
      }
   };

   // 카카오 맵 초기화
   useEffect(() => {
      if (isMapLoaded) {
         const container = document.getElementById("map");
         if (!container) {
            console.error("Map container not found");
            return;
         }
         const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 초기 중심 좌표
            level: 3,
         };
         const mapInstance = new window.kakao.maps.Map(container, options);
         setMap(mapInstance);
      }
   }, [isMapLoaded]);

   // 도시 선택 이벤트 핸들러
   const handleCityChange = (e) => {
      const city = e.target.value; // 선택한 도시 값
      setSelectedCity(city); // 상태 업데이트
      setTowns([]); // 구/군 목록 초기화
      setSelectedTown(""); // 선택된 구/군 초기화
      setHasSearched(false); // 검색 결과 초기화
      setKeyword(""); // 입력한 키워드 초기화
      if (city) fetchTowns(city); // 도시 선택 시 구/군 목록 로드
   };

   // 구/군 선택 이벤트 핸들러
   const handleTownChange = (e) => {
      const town = e.target.value; // 선택한 구/군 값
      setSelectedTown(town); // 상태 업데이트
      setHasSearched(false); // 검색 결과 초기화
   };

   // 검색어 입력 핸들러
   const handleKeywordChange = (e) => {
      //setCities([]); // 도시 목록 초기화
      setSelectedCity(""); // 선택된 도시 초기화
      setTowns([]); // 구/군 목록 초기화
      setSelectedTown(""); // 선택된 구/군 초기화
      setHasSearched(false); // 검색 결과 초기화
      setKeyword(e.target.value);
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
               <p>지역 선택</p>
               <div className={commons.common_search_select}>
                  <div className={commons.common_search_select_box}>
                     <div className={commons.commons__custom__selects}>
                        <select onChange={handleCityChange} value={selectedCity} className={commons.commons__select}>
                           <option value="">선택하세요</option>
                           {cities.map((city, index) => (
                              <option key={index} value={city}>
                                 {city}
                              </option>
                           ))}
                        </select>
                        <span className="material-icons">keyboard_arrow_down</span>
                     </div>
                  </div>
                  <div className={commons.common_search_select_box}>
                     <div className={commons.commons__custom__selects}>
                        <select
                           onChange={handleTownChange}
                           value={selectedTown}
                           className={commons.commons__select}
                           disabled={!selectedCity}
                        >
                           <option value="">선택하세요</option>
                           {towns.map((town, index) => (
                              <option key={index} value={town}>
                                 {town}
                              </option>
                           ))}
                        </select>
                        <span className="material-icons">keyboard_arrow_down</span>
                     </div>
                  </div>
               </div>
               
               <p>검색어 검색</p>
               <div className={commons.common_search_div}>
                  <form onSubmit={handleSearch}>
                     <input
                        type="text"
                        placeholder="상세주소로 검색하기"
                        value={keyword}
                        onChange={handleKeywordChange}
                     />
                     <button type="submit" className="material-icons">search</button>
                  </form>
               </div>
            </li>
         </ul>

         <div className={styles.Sub302__content_container}>
            <div className={styles.Sub302__resultField}>
               {hasSearched && (
                  <p>
                     "{selectedCity} {selectedTown ? selectedTown : ""} {keyword} (으)로 검색한 결과는 총 <span>{markers.length}</span>건 입니다."
                  </p>
               )}
               <div className={styles.Sub303__map} id="map" style={{ width: "100%", height: "350px" }}></div>
            </div>
         </div>
      </>
   );
}

export default Sub303;