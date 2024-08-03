import React from 'react';
import SideBar from '../components/SideBar.jsx';
import ProgressCircle from '../components/ProgressCircle.jsx';
import Header from '../components/Header.jsx';
import backgroundImage from '../assets/bgWhite.png';
import backgroundImageDark from '../assets/bgDark.png';
import useUser from '../http/hooks/useUser.js';
import {formatNumberWithSpaces} from '../utils.js';
import RocketProgressBar from '../components/RocketProgressBar.jsx';

const Home = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTExMTEsInVzZXJuYW1lIjoiZ3JlZ2VyZXJnIiwiYmlvIjp7ImZpcnN0X25hbWUiOiJxd3dlZnd3ZWYiLCJsYXN0X25hbWUiOiJlcmdlIiwibGFuZ3VhZ2UiOiJ3cWQifSwiaWF0IjoxNzIxOTMzMDcyfQ.aXM7KJjCutpqWEzEjwQr0CGAtpUKmz9Y-8HRhiooO-E';
    const {user, loading, error} = useUser(token);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const tg = window.Telegram.WebApp;
    const user1 = tg.initDataUnsafe.user;
    console.log(user1);
    const theme = tg.colorScheme;

    return (
        <div
            className={`flex flex-col h-screen overflow-hidden ${theme === 'dark' ? 'bg-[#10152C] text-white' : 'bg-white text-black'}`}>
            <div className="fixed top-0 w-full z-10">
                <Header/>
                <div className={'mt-[17%] ml-7'}>
                    <RocketProgressBar/>
                </div>
            </div>
            <div
                className="flex-grow overflow-hidden rounded-xl z-20 shadow-lg w-full max-w-screen-lg mx-auto mt-[30%] rounded-t-3xl"
                style={{
                    boxShadow : '0 4px 20px rgba(0, 255, 252, 0.5)',
                    borderTop : '1px solid #00FFFC'
                }}>
                <div className="bg-cover bg-center h-[60%]"
                     style={{
                         backgroundImage : `url(${theme === 'dark' ? backgroundImageDark : backgroundImage})`,
                         backgroundPosition : 'center',
                         backgroundSize : '140% 103%',
                     }}>
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex items-center justify-center mb-[-2%]">
                            <img src={`/src/assets/${theme === 'dark' ? 'coinDark.png' : 'coin.png'}`}
                                 className="w-[15%] h-[60%]"/>
                            <div className="text-[5vw] ml-1 font-typingrad">
                                {formatNumberWithSpaces(user.crypto_data.tonix.balance)}
                            </div>
                        </div>
                        <div className="flex justify-center relative mt-[-2vh]">
                            <img src={'/src/assets/circle.png'} className="absolute z-0 h-[44vh] w-[44vh]"/>
                            <img src={'/src/assets/img.webp'} className="relative z-10 h-[44vh] w-[44vh]"/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center space-x-18 mt-[-2vh]">
                    <ProgressCircle
                        percentage={25}
                        label="Фарминг"
                        icon={`/src/assets/${theme === 'dark' ? 'farmingDark.png' : 'farming-icon.png'}`}
                    />
                    <ProgressCircle
                        percentage={75}
                        label="Энергия"
                        icon={`/src/assets/${theme === 'dark' ? 'energyDark.png' : 'energy-icon.png'}`}
                    />
                </div>
                <div className="text-center font-lego text-3xl mt-[8%]">DAILY GAMES</div>
            </div>
            <div className="fixed bottom-3 left-0 w-full mx-auto z-50">
                <SideBar/>
            </div>

        </div>
    );
};

export default Home;