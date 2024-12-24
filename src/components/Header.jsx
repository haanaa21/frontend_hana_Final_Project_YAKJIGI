import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <div>
            <h3>헤더입니다.</h3>
            <Link to="/">Main 페이지</Link>
            <Link to="/Sub101">Sub101가는 페이지</Link>
            <Link to="/Sub301">Sub301가는 페이지</Link>
            <Link to="/Sub403">Sub403가는 페이지</Link>
            <Link to="/Mybasicboardlogwrite">Mybasicboardlogwrite가는 페이지</Link>
            <Link to="/MybasicboardlogDetaile">MybasicboardlogDetaile가는 페이지</Link>
            <Link to="/MybasicboardlogEdit">MybasicboardlogEdit가는 페이지</Link>
            <Link to="/Mybasicboardlog">Mybasicboardlog가는 페이지</Link>
        </div>
    );
}

export default Header;