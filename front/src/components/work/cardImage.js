import React from 'react';
import LiftPower from '../../assets/envWork/lift_power.svg';
import EyeSightImg from '../../assets/envWork/eye.svg';
import HandWorkImg from '../../assets/envWork/gesturing.svg';
import BothHandsImg from '../../assets/envWork/palms.svg';
import StndWalkImg from '../../assets/envWork/walking.svg';
import LstTalkImg from '../../assets/envWork/lstn_talk.svg';
import './CardImage.css';

const CardImage = ({ selectedJob }) => {
    const envImages = {
        bothHands: BothHandsImg,
        eyesight: EyeSightImg,
        handWork: HandWorkImg,
        liftPower: LiftPower,
        lstnTalk: LstTalkImg,
        stndWalk: StndWalkImg
    };

    const envDescriptions = {
        bothHands: "양손 작업 가능",
        eyesight: "시력",
        handWork: "손 작업",
        liftPower: "들기 능력",
        lstnTalk: "듣고 말하기",
        stndWalk: "서서 걷기"
    };

    const envKeys = [
        'bothHands',
        'eyesight',
        'handWork',
        'liftPower',
        'lstnTalk',
        'stndWalk'
    ];
    return (
        <div className="card-image-container">
            {envKeys.map((key) => (
                selectedJob[`env${key.charAt(0).toUpperCase() + key.slice(1)}`] && (
                    <div className="card" key={key}>
                        <img src={envImages[key]} alt={key} className="card-img" />
                        <div className="card-description">
                            {envDescriptions[key]}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default CardImage;