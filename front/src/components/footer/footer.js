import React from 'react';
import './index.css';

function Footer() {

    return (
        <div className="footer-container">
            <div className="footer-info">
                <div className="info">서비스 소개</div>
                <div className="info">서비스 약관</div>
                <div className="info">개인정보처리방침</div>
                <div className="info">도움말</div>
            </div>
            <div className="info">@ JOEUNDAE. All rights reserved.</div>
        </div>
    );
}

export default Footer;
