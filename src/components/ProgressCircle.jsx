import React from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// eslint-disable-next-line react/prop-types
const ProgressCircle = ({percentage, label, icon}) => {
    const gradientId = `gradient-${percentage}`;
    const tg = window.Telegram.WebApp;
    const theme = tg.colorScheme;

    return (
        <div className="flex flex-col items-center">
            <svg width="0" height="0">
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor : '#02F9FD', stopOpacity : 1}}/>
                        <stop offset="100%" style={{stopColor : '#CA59FF', stopOpacity : 1}}/>
                    </linearGradient>
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#02F9FD" floodOpacity="1"/>
                        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#CA59FF" floodOpacity="1"/>
                    </filter>
                </defs>
            </svg>
            <div className={`w-[45%]`} style={{position : 'relative'}}>
                <div style={{filter : 'url(#shadow)', position : 'absolute', top : 0, left : 0, right : 0, bottom : 0}}>
                    <CircularProgressbar
                        value={percentage}
                        strokeWidth={15}
                        styles={buildStyles({
                            pathColor : `url(#${gradientId})`,
                            trailColor : '#d6d6d6',
                        })}
                        className="font-typingrad"
                    />
                </div>
                <div style={{position : 'relative'}}>
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={15}
                        styles={buildStyles({
                            textColor : theme === 'dark' ? '#fff' : '#000',
                            pathColor : 'transparent', // Прозрачный цвет пути для второго слоя
                            trailColor : 'transparent', // Прозрачный цвет тропы для второго слоя
                            textSize : '25px',
                        })}
                        className="font-typingrad"
                    />
                </div>
            </div>
            <div className="flex items-center">
                {icon && <img src={icon} alt={label} className="w-4 h-4 mr-2"/>}
                <div className={`text-s font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{label}</div>
            </div>
        </div>
    );
};

export default ProgressCircle;
