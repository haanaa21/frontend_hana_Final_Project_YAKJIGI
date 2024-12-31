import React, { useEffect, useState } from "react";
import commons from '../../styles/common.module.css';
import styles from '../../styles/sub3/sub303.module.css';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import axios from 'axios';

function Sub303() {
   const { mainTitle, subTitle } = useDocumentTitle();
   const [isMapLoaded, setIsMapLoaded] = useState(false);
   const [cities, setCities] = useState([]);
   const [towns, setTowns] = useState([]);
   const [addresses, setAddresses] = useState([]);
   const [selectedCity, setSelectedCity] = useState("");
   const [selectedTown, setSelectedTown] = useState("");
   const [map, setMap] = useState(null);
   const [marker, setMarker] = useState(null);

   useEffect(() => {
      // Kakao 지도 API 로드 확인
      const checkKakaoMaps = () => {
         if (window.kakao && window.kakao.maps) {
            setIsMapLoaded(true);
         } else {
            setTimeout(checkKakaoMaps, 100);
         }
      };
      checkKakaoMaps();
   }, []);

   useEffect(() => {
      // API 호출하여 city 데이터 가져오기
      const fetchCities = async () => {
         try {
            const response = await axios.get('/api/getCities');
            if (response.data) {
               const uniqueCities = [...new Set(response.data.map(city => city.name))];
               setCities(uniqueCities);
            }
         } catch (error) {
            console.error("Error fetching cities:", error);
         }
      };
      fetchCities();
   }, []);

   const fetchTowns = async (city) => {
      try {
         const response = await axios.get(`/api/getTowns?city=${city}`);
         if (response.data) {
            const uniqueTowns = [...new Set(response.data.map(town => town.name))];
            setTowns(uniqueTowns);
         }
      } catch (error) {
         console.error("Error fetching towns:", error);
      }
   };

   const fetchAddresses = async (town) => {
      try {
         const response = await axios.get(`/api/getAddresses?town=${town}`);
         if (response.data) {
            setAddresses(response.data);
         }
      } catch (error) {
         console.error("Error fetching addresses:", error);
      }
   };

   useEffect(() => {
      if (isMapLoaded) {
         // Kakao 지도 초기화
         const container = document.getElementById("map");
         const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
         };
         const mapInstance = new window.kakao.maps.Map(container, options);
         setMap(mapInstance);
         setMarker(new window.kakao.maps.Marker());
      }
   }, [isMapLoaded]);

   const handleCityChange = (e) => {
      const city = e.target.value;
      setSelectedCity(city);
      setTowns([]);
      setAddresses([]);
      if (city) fetchTowns(city);
   };

   const handleTownChange = (e) => {
      const town = e.target.value;
      setSelectedTown(town);
      setAddresses([]);
      if (town) fetchAddresses(town);
   };

   const handleAddressChange = (e) => {
      const address = addresses.find(addr => addr.name === e.target.value);
      if (address && map && marker) {
         const coords = new window.kakao.maps.LatLng(address.lat, address.lng);
         map.setCenter(coords);
         marker.setPosition(coords);
         marker.setMap(map);
      }
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
                        <option key={index} value={city}>{city}</option>
                     ))}
                  </select>
                  <select onChange={handleTownChange} value={selectedTown} className={commons.commons__select}>
                     <option value="">선택하세요</option>
                     {towns.map((town, index) => (
                        <option key={index} value={town}>{town}</option>
                     ))}
                  </select>
                  <select onChange={handleAddressChange} className={commons.commons__select}>
                     <option value="">선택하세요</option>
                     {addresses.map((addr, index) => (
                        <option key={index} value={addr.name}>{addr.name}</option>
                     ))}
                  </select>
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