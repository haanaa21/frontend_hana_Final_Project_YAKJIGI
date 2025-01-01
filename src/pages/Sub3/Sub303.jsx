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
   const [addresses, setAddresses] = useState([]); // 검색된 주소 목록
   const [selectedCity, setSelectedCity] = useState(""); // 사용자가 선택한 도시
   const [selectedTown, setSelectedTown] = useState(""); // 사용자가 선택한 구/군
   const [map, setMap] = useState(null); // 카카오 맵 인스턴스
   const [markers, setMarkers] = useState([]); // 지도에 표시된 마커들

   const handleSearch = async () => {
      try {
         const response = await axios.get("/api/getAddresses", {
            params: { city: selectedCity, town: selectedTown }, // 선택된 도시와 구/군을 파라미터로 전달
         });
         if (response.data) {
            setAddresses(response.data); // 검색된 주소를 상태로 저장
   
            markers.forEach((marker) => marker.setMap(null)); // 이전 마커 삭제
   
            const newMarkers = response.data.map((addr) => { // 새 마커 생성
               const coords = new window.kakao.maps.LatLng(addr.lat, addr.lng); // 좌표 설정
               const marker = new window.kakao.maps.Marker({ position: coords }); // 마커 생성
               marker.setMap(map); // 지도에 마커 추가
               return marker;
            });
            setMarkers(newMarkers); // 마커 상태 업데이트
   
            if (response.data.length > 0) { // 검색된 주소가 있으면 지도 배율 자동 조정
               const bounds = new window.kakao.maps.LatLngBounds();
               response.data.forEach((addr) => {
                  bounds.extend(new window.kakao.maps.LatLng(addr.lat, addr.lng));
               });
               map.setBounds(bounds); // 지도 범위 설정
            }
         }
      } catch (error) {
         console.error("Error fetching addresses:", error); // 에러 처리
      }
   };

   useEffect(() => {
      const checkKakaoMaps = () => {
         if (window.kakao && window.kakao.maps) {
            setIsMapLoaded(true); // 카카오 맵 로드 완료 시 상태 업데이트
         } else {
            setTimeout(checkKakaoMaps, 100); // 로드되지 않았으면 100ms 후 재확인
         }
      };
      checkKakaoMaps();
   }, []);

   useEffect(() => {
      const fetchCities = async () => {
         try {
            const response = await axios.get('/api/getCities');
            if (response.data) {
               console.log("Fetched cities:", response.data); // 응답 데이터 출력
               setCities(response.data); // City 데이터를 상태에 저장
            }
         } catch (error) {
            console.error("Error fetching cities:", error);
         }
      };
      fetchCities();
   }, []);

   const fetchTowns = async (city) => {
      try {
         const response = await axios.get(`/api/getTowns?city=${city}`); // 선택한 도시를 파라미터로 API 호출
         if (response.data) {
            const uniqueTowns = [...new Set(response.data.map((town) => town.name))]; // 중복 제거
            setTowns(uniqueTowns); // 구/군 목록 업데이트
         }
      } catch (error) {
         console.error("Error fetching towns:", error); // 에러 처리
      }
   };

   useEffect(() => {
      if (isMapLoaded) { // 맵이 로드된 경우에만 실행
         const container = document.getElementById("map"); // 맵이 표시될 DOM 요소
         const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 초기 중심 좌표
            level: 3, // 초기 줌 레벨
         };
         const mapInstance = new window.kakao.maps.Map(container, options); // 맵 인스턴스 생성
         setMap(mapInstance); // 맵 상태 업데이트
      }
   }, [isMapLoaded]);

   const handleCityChange = (e) => {
      const city = e.target.value; // 선택한 도시 값
      setSelectedCity(city); // 상태 업데이트
      setTowns([]); // 구/군 목록 초기화
      setAddresses([]); // 주소 목록 초기화
      if (city) fetchTowns(city); // 도시 선택 시 구/군 목록 로드
   };

   const handleTownChange = (e) => {
      const town = e.target.value; // 선택한 구/군 값
      setSelectedTown(town); // 상태 업데이트
      setAddresses([]); // 주소 목록 초기화
   };

   return (
      <>
         <div className={commons.container__box__title}>
         <h2 className={commons.main_title}>{mainTitle}</h2>
         <p className={commons.sub_title}>{subTitle}</p>
         </div>

         <ul className={commons.common_search_container}>
         <li>
            <p>지역 선택</p>
            <div className={commons.common_search_select}>
               <select onChange={handleCityChange} value={selectedCity} className={commons.commons__select}>
               <option value="">선택하세요</option>
               {cities.map((city, index) => (
                  <option key={index} value={city}>
                     {city}
                  </option>
               ))}
               </select>
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
               <button onClick={handleSearch} className={commons.commons__button}>
               검색
               </button>
            </div>
         </li>
         </ul>

         <div className={styles.Sub302__content_container}>
         <div className={styles.Sub302__resultField}>
            <p>"검색 결과를 지도에서 확인하세요."</p>
            <div className={styles.Sub303__map} id="map" style={{ width: "100%", height: "350px" }}></div>
         </div>
         </div>
      </>
   );
}

export default Sub303;