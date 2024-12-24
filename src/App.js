import 'reset-css';
import './App.css';
import './styles/common.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sub101 from './pages/Sub1/Sub101';
import Sub301 from './pages/Sub3/Sub301';
import Sub403 from './pages/Sub4/Sub403';
import Container from './pages/Main/Container';
import Mybasicboardlogwrite from './pages/Mybasicboardlog/MybasicboardlogWrite';
import MybasicboardlogDetaile from './pages/Mybasicboardlog/MybasicboardlogDetaile';
import MybasicboardlogEdit from './pages/Mybasicboardlog/MybasicboardlogEdit';
import Mybasicboardlog from './pages/Mybasicboardlog/Mybasicboardlog';
import 'swiper/css'; // node_modules 불러오는 swipercss
import 'swiper/css/pagination'; // node_modules 불러오는 pagination
import 'swiper/css/navigation'; // node_modules 불러오는 navigation

import AOS from 'aos';
import '../node_modules/aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
   useEffect(() => {
      AOS.init({
         duration: 1000, // 애니메이션 지속 시간
      });
      return () => {
         AOS.refresh(); // 컴포넌트 언마운트 시 AOS 새로 고침
      };
   }, []);

   return (
      <BrowserRouter>
         <div className='App'>
            {/* 메인 */}
            <Header />
            <Routes>
               <Route path='/' element={<Container />} />
               <Route path='/sub101' element={<Sub101 />} />
               <Route path='/sub301' element={<Sub301 />} />
               <Route path='/sub403' element={<Sub403 />} />
               <Route path='/mybasicboardlogwrite' element={<Mybasicboardlogwrite />} />
               <Route path='/mybasicboardlogdetaile' element={<MybasicboardlogDetaile />} />
               <Route path='/mybasicboardlogedit' element={<MybasicboardlogEdit />} />
               <Route path='/mybasicboardlog' element={<Mybasicboardlog />} />
            </Routes>
            <Footer />
         </div>
      </BrowserRouter>
   );
}
export default App;
