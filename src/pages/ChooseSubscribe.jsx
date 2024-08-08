import {useState} from 'react';import useUser from '../http/hooks/useUser.js';import Header from '../components/Header.jsx';import RocketProgressBar from '../components/RocketProgressBar.jsx';import backgroundImageDark from '../assets/rocketBgDark1.png';import backgroundImage from '../assets/rocketBgWhite.png';import SideBar from '../components/SideBar.jsx';import {generateUserToken} from '../utils.js';import {Link} from 'react-router-dom';const ChooseSubscribe = () => {    const [selectedOption, setSelectedOption] = useState(10);    const tg = window.Telegram.WebApp;    const userTg = tg.initDataUnsafe.user;    const theme = tg.colorScheme;    const token = generateUserToken(userTg);    const {user, loading, error} = useUser(token);    if (loading) return <div>Loading...</div>;    if (error) return <div>Error: {error}</div>;    const options = [        {period : '1 month', price : '8 TON', value : 8},        {period : '3 months', price : '10 TON', value : 10},        {period : '6 months', price : '15 TON', value : 15},    ];    return (        <div            className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-[#10152C] text-white' : 'bg-white text-black'}`}>            <div className="fixed top-0 w-full z-10">                <Header/>                <div className={'mt-[17%] ml-7'}>                    <RocketProgressBar/>                </div>            </div>            <div                className={`flex-grow p-2 rounded-xl shadow-lg max-w-xl mx-auto mt-[30%] rounded-t-3xl z-20 relative                 ${theme === 'dark' ? 'text-white' : 'text-black'}`}                style={{                    backgroundImage : `url(${theme === 'dark' ? backgroundImageDark : backgroundImage})`,                    backgroundPosition : 'center -120px',                    backgroundSize : '100% 120%', // Уменьшает изображение до 50% от его исходных размеров по ширине и высоте                    boxShadow : '0 4px 20px rgba(0, 255, 252, 0.5)',                    borderTop : '1px solid #00FFFC',                    width : '100%',                    height : '100vh'                }}>                <div className="h-[63vh] w-[96vw]">                    <div className="flex items-center justify-center">                        <div className="p-6 rounded-xl shadow-md w-[90vw] max-w-md mt-[10vh]"                             style={{                                 backgroundImage : `url('/assets/gradient1.webp')`,                                 backgroundColor : 'transparent',                                 backgroundSize : 'cover',                                 backgroundPosition : 'center',                                 backgroundRepeat : 'no-repeat',                                 boxShadow : '0 4px 20px rgba(0, 255, 252, 0.5)',                                 borderTop : '1px solid #00FFFC',                             }}>                            <h2 className="text-center text-2xl font-bold mb-4 font-lego text-black">TONIX PRO</h2>                            <div className="space-y-4 font-bold">                                {options.map((option) => (                                    <div                                        key={option.value}                                        className={`flex items-center justify-between p-4 rounded-3xl cursor-pointer ${                                            selectedOption === option.value                                                ? 'bg-[#7D5DFF] text-white'                                                : 'bg-white text-black'                                        }`}                                        onClick={() => setSelectedOption(option.value)}                                    >                                        <span>{option.period}</span>                                        <p><span>{option.value}</span> <span className={'font-lego'}>TON</span></p>                                    </div>                                ))}                                <div>                                    <Link to="/stats">                                        <button                                            className="flex items-center justify-center w-full py-2 rounded-full shadow-md text-white bg-[#7D5DFF]">                                            <img src="/assets/rocketCoin.png" alt="rocket icon"                                                 className="w-6 h-6 mr-2"/>                                            <p><span>{selectedOption}</span> <span className={'font-lego'}>TON</span>                                            </p>                                        </button>                                    </Link>                                </div>                            </div>                        </div>                    </div>                </div>                <div className="fixed bottom-3 left-0 w-full mx-auto">                    <SideBar/>                </div>            </div>        </div>    );};export default ChooseSubscribe;