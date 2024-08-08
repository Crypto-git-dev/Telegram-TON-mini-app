import {useRef, useState, useEffect} from 'react';
import SideBar from '../components/SideBar.jsx';
import ProgressCircle from '../components/ProgressCircle.jsx';
import Header from '../components/Header.jsx';
import backgroundImage from '/assets/bgWhite.png';
import backgroundImageDark from '/assets/bgDark.png';
import useUser from '../http/hooks/useUser.js';
import {createJWT, createUnixTime, formatNumberWithSpaces, generateUserToken} from '../utils.js';
import RocketProgressBar from '../components/RocketProgressBar.jsx';
import useRobot from '../http/hooks/useRobot.js';

const Home = () => {
    const tg = window.Telegram.WebApp;
    const userTg = tg.initDataUnsafe.user;
    const theme = tg.colorScheme;
    const token = generateUserToken(userTg);
    const {user, loading, error} = useUser(token);

    const toni_token = user?.robot_id ? createJWT({
        id : user.robot_id,
        data : createUnixTime(),
    }) : null;

    const robotData = useRobot(toni_token);
    let {robot} = robotData || {};

    const [energy, setEnergy] = useState(() => {
        const savedEnergy = localStorage.getItem('energy');
        return savedEnergy ? parseFloat(savedEnergy) : 100;
    });

    const [farming, setFarming] = useState(() => {
        const savedFarming = localStorage.getItem('farming');
        return savedFarming ? parseFloat(savedFarming) : 0;
    });

    const [isFarming, setIsFarming] = useState(false);
    const intervalRef = useRef(null);

    const updateEnergyAndFarming = () => {
        const lastUpdate = localStorage.getItem('lastUpdate');
        const startTime = localStorage.getItem('startTime');
        const now = Math.floor(Date.now() / 1000);
        if (lastUpdate && startTime) {
            const elapsed = now - parseInt(lastUpdate, 10);
            const totalElapsed = now - parseInt(startTime, 10);
            const duration = parseInt(localStorage.getItem('duration'), 10) || 100;
            const step = 100 / duration;

            if (totalElapsed <= duration) {
                const updatedEnergy = 100 - step * totalElapsed;
                const updatedFarming = step * totalElapsed;
                setEnergy(updatedEnergy > 0 ? updatedEnergy : 0);
                setFarming(updatedFarming < 100 ? updatedFarming : 100);
            } else {
                const reverseElapsed = totalElapsed - duration;
                const updatedEnergy = step * reverseElapsed;
                const updatedFarming = 100 - step * reverseElapsed;
                setEnergy(updatedEnergy < 100 ? updatedEnergy : 100);
                setFarming(updatedFarming > 0 ? updatedFarming : 0);
            }
        }
    };

    useEffect(() => {
        updateEnergyAndFarming();
        intervalRef.current = setInterval(updateEnergyAndFarming, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        localStorage.setItem('energy', energy);
        localStorage.setItem('farming', farming);
        localStorage.setItem('lastUpdate', Math.floor(Date.now() / 1000));
    }, [energy, farming]);

    const handleClick = async () => {
        try {
            const response = await fetch('https://api.tonixhub.com/api/v1/api/clik_farm', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    id : user.id,
                    data : createUnixTime()
                }),
            });
            const data = await response.json();
            location.reload();
        } catch (error) {
            return <div>Error: {error.message}</div>;
        }
    };

    const startFarm = async () => {
        try {
            const response = await fetch('https://api.tonixhub.com/api/v1/api/clik_farm', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    id : user.id,
                    data : createUnixTime(),
                    robot_id : user.robot_id
                }),
            });
            const data = await response.json();

            const res = await fetch(`https://api.tonixhub.com/api/v1/toni_robot/${toni_token}`);
            const result = await res.json();
            robot = result;
            const miningData = result.mining_data;


            const now = Math.floor(Date.now() / 1000);
            const duration = miningData.end_status_time - miningData.last_click;

            localStorage.setItem('startTime', now);
            localStorage.setItem('lastUpdate', now);
            localStorage.setItem('duration', duration);

            setEnergy(100);
            setFarming(0);
            setIsFarming(true);

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            intervalRef.current = setInterval(updateEnergyAndFarming, 1000);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

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
                        <div className="mb-[-2%]">
                            {user.robot_id ? (
                                <div className="flex items-center justify-center mb-[-2%]">
                                    <img src={`/assets/${theme === 'dark' ? 'coinDark.png' : 'coin.png'}`}
                                         className="w-[25%] h-[60%]"/>
                                    <div className="text-[5vw] ml-2 font-typingrad">
                                        {user.robot_id ? formatNumberWithSpaces(robot?.mining_data?.total_amount || 0) : 0}
                                    </div>
                                </div>
                            ) : (
                                <div onClick={handleClick} className={'z-30 p-5'}>
                                    <button
                                        className="bg-gradient-to-r from-[#02F9FD] to-[#CA59FF] text-white font-bold py-1 px-4 rounded-lg shadow-lg duration-200"
                                    >
                                        Создать TONi
                                    </button>
                                </div>

                            )}
                        </div>

                        <div className="flex justify-center relative mt-[-2vh]"
                             onClick={user.robot_id && !isFarming ? startFarm : undefined}>
                            <img src={'/assets/circle.png'} className="absolute z-0 h-[44vh] w-[44vh]"
                            />
                            <img
                                src={'/assets/img.webp'}
                                className={`relative z-10 h-[44vh] w-[44vh] ${user.robot_id && !isFarming ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                                alt="Farming"
                            />
                        </div>

                    </div>
                </div>
                <div className="flex justify-center space-x-18 mt-[-2vh]">
                    <ProgressCircle
                        percentage={Math.max(0, farming.toFixed(0))}
                        label={`Фарминг`}
                        icon={`/assets/${theme === 'dark' ? 'farmingDark.png' : 'farming-icon.png'}`}
                    />
                    <ProgressCircle
                        percentage={Math.max(0, energy.toFixed(0))}
                        label={`Энергия`}
                        icon={`/assets/${theme === 'dark' ? 'energyDark.png' : 'energy-icon.png'}`}
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
