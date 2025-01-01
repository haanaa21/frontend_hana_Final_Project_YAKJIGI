import 'reset-css';
import './App.css';
import './styles/common.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Sub101 from './pages/Sub1/Sub101';
import Sub301 from './pages/Sub3/Sub301';
import Sub403 from './pages/Sub4/Sub403';
import Container from './pages/Main/Container';
import Mybasicboardlogwrite from './pages/Mybasicboardlog/MybasicboardlogWrite';
import MybasicboardlogDetaile from './pages/Mybasicboardlog/MybasicboardlogDetaile';
import MybasicboardlogEdit from './pages/Mybasicboardlog/MybasicboardlogEdit';
import Mybasicboardlog from './pages/Mybasicboardlog/Mybasicboardlog';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import AOS from 'aos';
import '../node_modules/aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Sub303 from './pages/Sub3/Sub303';
import MapTest from './pages/Sub3/MapTest';

import TestComponent from './pages/Sub3/TestComponent'; // TestComponent 경로 추가

function App() {
   // 이벤트 상태 관리
   const [events, setEvents] = useState([
      { title: "약 이름1", date: "2024-12-15" },
      { title: "약 이름2", date: "2024-12-15" },
      { title: "약 이름3", date: "2024-12-03" },
      { title: "약 이름4", date: "2024-12-03" },
   ]);

   // 새로운 이벤트 추가 함수
   const addEvent = (newEvent) => {
      setEvents((prevEvents) => [...prevEvents, newEvent]);
   };

   useEffect(() => {
      AOS.init({
         duration: 1000,
      });
      return () => {
         AOS.refresh();
      };
   }, []);

   useEffect(() => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP}&autoload=false&libraries=services,clusterer`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
         window.kakao.maps.load(() => {
            console.log("Kakao Maps API 로드 완료");
         });
      };

      return () => {
         document.head.removeChild(script);
      };
   }, []);

   return (
      <BrowserRouter>
         <div className="App">
            {/* 메인 */}
            <Header />
            <Routes>
               <Route path="/" element={<Container />} />
               <Route path="/sub101" element={<Sub101 />} />
               <Route path="/sub301" element={<Sub301 />} />
               <Route path="/sub303" element={<Sub303 />} />
               <Route path="/sub403" element={<Sub403 />} />
               <Route path="/mybasicboardlog" element={<Mybasicboardlog events={events} />} />
               <Route path="/mybasicboardlogwrite" element={<Mybasicboardlogwrite addEvent={addEvent} />} />
               <Route path="/mybasicboardlogdetaile" element={<MybasicboardlogDetaile />} />
               <Route path="/mybasicboardlogedit" element={<MybasicboardlogEdit />} />
               <Route path="/MapTest" element={<MapTest />} />
               {/* 새로 추가된 TestComponent 경로 */}
               <Route path="/test" element={<TestComponent />} />
            </Routes>
            <Footer />
         </div>
      </BrowserRouter>
   );
}

export default App;