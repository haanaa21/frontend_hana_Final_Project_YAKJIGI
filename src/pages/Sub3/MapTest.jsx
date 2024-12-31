import React, { useEffect, useState } from "react";

function MapTest() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Kakao 지도 API 로드 확인
    const checkKakaoMaps = () => {
      if (window.kakao && window.kakao.maps) {
        setIsMapLoaded(true); // 지도 로드 완료
      } else {
        // Kakao Maps가 아직 로드되지 않았다면 다시 확인
        setTimeout(checkKakaoMaps, 100);
      }
    };

    checkKakaoMaps();
  }, []);

  useEffect(() => {
    if (isMapLoaded) {
      // Kakao 지도 초기화
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 중심 좌표
        level: 3, // 확대 레벨
      };

      const map = new window.kakao.maps.Map(container, options);

      // 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    }
  }, [isMapLoaded]);

  return (
    <div>
      <h1>MapTest</h1>
      <div
        id="map"
        style={{
          width: "1000px",
          height: "600px",
        }}
      ></div>
    </div>
  );
}

export default MapTest;