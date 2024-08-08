import {useState} from 'react';
import useUser from '../http/hooks/useUser.js';
import {createJWT, createUnixTime, formatNumberWithSpaces, generateUserToken} from '../utils.js';
import {Link} from 'react-router-dom';
import useRobot from '../http/hooks/useRobot.js';

const Header = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const tg = window.Telegram.WebApp;
    const userTg = tg.initDataUnsafe.user;
    const theme = tg.colorScheme;

    const token = generateUserToken(userTg);
    const {user, loading, error} = useUser(token);

    const toni_token = user?.robot_id ? createJWT({
        robot_id : user.robot_id,
        data : createUnixTime(),
    }) : null;

    const robotData = useRobot(toni_token);
    let {robot} = robotData || {};

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <div className="flex justify-center mt-[0.5vh] mx-[5vw] h-[10%] fixed top-1 w-screen">
            <div className={'flex items-center'}>
                <Link to="/profile">
                    <div className={'mt-2 w-[60px] h-[60px]'}>
                        <img src="/assets/headPerson.png"/>
                    </div>
                </Link>
                <div className={''}>
                    <Link to="/profile">
                        <div
                            className={`text-sm  font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                            {userTg.username.length > 20 ? `${userTg.username.slice(0, 10)}...` : userTg.username}
                        </div>
                    </Link>
                    <div className="flex items-center text-gray-700">
                        <img src={`/assets/${theme === 'dark' ? 'levelDark.png' : 'level.png'}`}
                             className={'w-[4vw] h-[2vh]'}/>
                        <div
                            className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{user.profile_lvl} lvl
                        </div>
                    </div>
                </div>
            </div>

            <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex flex-col items-center rounded-3xl mt-2 w-[48vw] ml-10 mr-10"
                style={{
                    backgroundImage : `url(/assets/gradient1.webp)`,
                    backgroundPosition : 'center',
                    height : !isExpanded ? '7vh' : '12vh'
                }}
            >
                <div className="text-gray-600 text-xs font-light">Баланс</div>
                <div className="flex items-center justify-center w-full">
                    <img src="/assets/coin.png" alt="icon" className="w-6 h-4 mr-2"/>
                    <span
                        className="text-xs text-black font-typingrad">{user.robot_id ? formatNumberWithSpaces(user.crypto_data.tonix.balance + robot?.mining_data?.total_amount) : 0}</span>
                    <span className="text-xs text-black font-typingrad ml-1">TONIX</span>
                </div>
                {isExpanded && (
                    <div
                        className={`flex flex-col items-center`}>
                        <div className="flex items-center mb-2 w-full justify-center">
                            <img src="/assets/ton.png" alt="icon" className="w-4 h-4 mr-5"/>
                            <span
                                className="text-xs text-black font-typingrad">{formatNumberWithSpaces(user.crypto_data.ton.balance)}</span>
                            <span className="text-xs text-black font-typingrad ml-1">TON</span>
                        </div>
                        <button
                            className="w-full px-[8vw] text-xs border-solid border-2 border-black text-black rounded-full shadow-md">Получить
                        </button>
                    </div>
                )}
                <div className="text-black">
                    {isExpanded ? (
                        <svg className="w-4 h-4 transform" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                    ) : (
                        <svg className="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd"
                                  d="M14.707 10.707a1 1 0 01-1.414 0L10 7.414 6.707 10.707a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;