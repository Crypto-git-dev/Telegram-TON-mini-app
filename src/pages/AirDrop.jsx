import React from 'react';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import RocketProgressBar from '../components/RocketProgressBar.jsx';

const AirDrop = () => {
    const games = [
        {
            title : 'Join the Quest',
            level : '3 lvl',
            imgSrc : '/assets/gamePic.png',
            icon : '/assets/airDropPlay.png',
        },
        {
            title : 'EtherQuest',
            price : '2000 Tonix',
            imgSrc : '/assets/gamePic.png',
            icon : '/assets/airDropPlay.png',
        },
        {
            title : 'Digital Dreams',
            price : '1200 Tonix',
            imgSrc : '/assets/gamePic.png',
            icon : '/assets/airDropPlay.png',
        },
        {
            title : 'Etheria Estates',
            price : 'Subscribe',
            imgSrc : '/assets/gamePic.png',
            icon : '/assets/airDropPlay.png',
        },
        {
            title : 'Etheria Estates',
            price : 'Subscribe',
            imgSrc : '/assets/gamePic.png',
            icon : '/assets/airDropPlay.png',
        },
    ];

    const tg = window.Telegram.WebApp;
    const theme = tg.colorScheme;

    return (
        <div
            className={`flex justify-center items-center min-h-screen h-full
             ${theme === 'dark' ? 'bg-[#10152C] text-white' : 'bg-white text-black'}`}
        >
            <div className="fixed top-0 w-full z-10">
                <Header/>
                <div className={'mt-[17%] ml-7'}>
                    <RocketProgressBar/>
                </div>
            </div>

            <div className={`px-8 py-2 rounded-lg max-w-full mx-auto mt-[30%]  rounded-t-3xl z-20
                  ${theme === 'dark' ? 'bg-[#10152C] text-white' : 'bg-white text-black'}}`}
                 style={{
                     boxShadow : '0 4px 20px rgba(0, 255, 252, 0.5)',
                     borderTop : '1px solid #00FFFC'
                 }}>
                <div>
                    <button
                        className="flex items-center justify-center w-80 py-2 mb-5 mt-4 rounded-full shadow-md text-black text-lg"
                        style={{
                            backgroundImage : `url('/assets/gradient1.webp')`,
                            backgroundSize : 'cover',
                            backgroundPosition : 'center',
                            backgroundRepeat : 'no-repeat'
                        }}>
                        Купить подписку на все airdrop
                    </button>
                </div>

                <div className="overflow-x-auto h-screen">
                    <div className="flex space-x-6" style={{width : 'max-content'}}>
                        {Array(Math.ceil(games.length / 2)).fill().map((_, colIndex) => (
                            <div key={colIndex} className="grid grid-rows-2 gap-6">
                                {games.slice(colIndex * 2, colIndex * 2 + 2).map((game, index) => (
                                    <div
                                        key={index}
                                        className="relative text-white rounded-lg shadow-md overflow-hidden w-64 h-40"
                                        style={{
                                            backgroundImage : `url(${game.imgSrc})`,
                                            backgroundSize : 'cover',
                                            backgroundPosition : 'center',
                                        }}
                                    >
                                        <div
                                            className="p-4 bg-gradient-to-t from-black via-transparent to-transparent h-full flex flex-col justify-end">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h2 className="text-lg font-bold">{game.title}</h2>
                                                    <p className="text-sm">{game.level || game.price}</p>
                                                </div>
                                                <img src={game.icon} alt="play icon" className="w-6 h-6"/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="fixed bottom-3 left-0 w-full mx-auto z-50">
                <SideBar/>
            </div>
        </div>
    );
};

export default AirDrop;