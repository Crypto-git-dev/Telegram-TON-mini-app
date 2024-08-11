import React, {useEffect, useState} from 'react';
import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import RocketProgressBar from '../components/RocketProgressBar.jsx';
import {createJWT, createUnixTime, generateUserToken} from '../utils.js';
import useUser from '../http/hooks/useUser.js';
import useRobot from '../http/hooks/useRobot.js';
import {useNavigate} from 'react-router';

const AirDrop = () => {
    const tg = window.Telegram.WebApp;
    const userTg = tg.initDataUnsafe.user;
    const theme = tg.colorScheme;

    const token = generateUserToken(userTg);
    const {user, loading, error} = useUser(token);

    const airdrop_token = user?.robot_id ? createJWT({
        id : user.id,
        data : createUnixTime(),
    }) : null;
    const [data, setData] = useState([]);

    const [activeOrWaitGames, setActiveOrWaitGames] = useState([]);
    const [endedGames, setEndedGames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.tonixhub.com/api/v1/get_airdrops/${airdrop_token}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                const activeOrWaitGames = data.filter(game => game.status === 'active' || game.status === 'wait');
                const endedGames = data.filter(game => game.status === 'ended');
                setActiveOrWaitGames(activeOrWaitGames);
                setEndedGames(endedGames);
            } catch (error) {
                throw new Error(error);
            }
        };
        fetchData();
    }, [airdrop_token]);

    const navigate = useNavigate();
    const handleClick = (game) => {
        navigate(`/airdrop/${game.id}`, {state : {game}});
    };

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

            <div className={`px-8 py-2 rounded-lg max-w-full mx-auto mt-[30%]  rounded-t-3xl z-20 w-[98vh]
                  ${theme === 'dark' ? 'bg-[#10152C] text-white' : 'bg-white text-black'}}`}
                 style={{
                     boxShadow : '0 4px 20px rgba(0, 255, 252, 0.5)',
                     borderTop : '1px solid #00FFFC'
                 }}>
                {/*<div>*/}
                {/*    <button*/}
                {/*        className="flex items-center justify-center w-80 py-2 mb-5 mt-4 rounded-full shadow-md text-black text-lg"*/}
                {/*        style={{*/}
                {/*            backgroundImage : `url('/assets/gradient1.webp')`,*/}
                {/*            backgroundSize : 'cover',*/}
                {/*            backgroundPosition : 'center',*/}
                {/*            backgroundRepeat : 'no-repeat'*/}
                {/*        }}>*/}
                {/*        Купить подписку на все airdrop*/}
                {/*    </button>*/}
                {/*</div>*/}

                <div className="text-center">
                    <h1 className="text-3xl font-lego font-bold">AIRDROP</h1>
                    <p className="text-xs"></p>
                </div>

                <div className="h-screen mx-auto mt-[5vh] space-y-8">
                    {/* Верхний блок - active и wait */}
                    <div className="overflow-x-auto">
                        <div className="flex space-x-6" style={{width : 'max-content'}}>
                            {activeOrWaitGames.map((game, index) => (
                                <div
                                    key={index}
                                    className={`relative text-white rounded-lg shadow-md overflow-hidden w-64 h-40 
                            ${game.status === 'wait' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                    style={{
                                        backgroundImage : `url(${game.icon})`,
                                        backgroundSize : 'cover',
                                        backgroundPosition : 'center',
                                        filter : game.status === 'wait' ? 'grayscale(100%) opacity(0.5)' : 'none'
                                    }}
                                    onClick={() => game.status !== 'wait' && handleClick(game)}
                                >
                                    {/* Замок для статуса wait */}
                                    {game.status === 'wait' && (
                                        <div className="absolute inset-0 flex justify-center items-center">
                                            <img src={'/assets/padlock.png'} alt="play icon" className="w-24 h-24"/>
                                        </div>
                                    )}

                                    <div
                                        className="p-4 bg-gradient-to-t from-black via-transparent to-transparent h-full flex flex-col justify-end">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-bold">{game.title}</h2>
                                                <p className="text-sm">{game.level || game.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Нижний блок - ended */}
                    <div className="overflow-x-auto">
                        <div className="flex space-x-6" style={{width : 'max-content'}}>
                            {endedGames.map((game, index) => (
                                <div
                                    key={index}
                                    className="relative text-white rounded-lg shadow-md overflow-hidden w-64 h-40 cursor-pointer"
                                    style={{
                                        backgroundImage : `url(${game.icon})`,
                                        backgroundSize : 'cover',
                                        backgroundPosition : 'center',
                                    }}
                                    onClick={() => handleClick(game)}
                                >
                                    <div
                                        className="p-4 bg-gradient-to-t from-black via-transparent to-transparent h-full flex flex-col justify-end">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-bold">{game.title}</h2>
                                                <p className="text-sm">{game.level || game.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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