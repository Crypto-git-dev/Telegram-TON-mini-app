import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import RocketProgressBar from '../components/RocketProgressBar.jsx';
import useUser from '../http/hooks/useUser.js';
import {createJWT, createUnixTime, generateUserToken} from '../utils.js';
import useRobot from '../http/hooks/useRobot.js';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';


const Nft = () => {
    const tg = window.Telegram.WebApp;
    const userTg = tg.initDataUnsafe.user;
    const theme = tg.colorScheme;

    const token = generateUserToken(userTg);
    const {user, loading, error} = useUser(token);
    const [data, setData] = useState([]);


    const location = useLocation();
    const {game} = location.state;

    const airdrop_token = game?.id ? createJWT({
        id : user.id,
        airdrop_id : game.id,
        data : createUnixTime(),
    }) : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.tonixhub.com/api/v1/get_about_airdrop/${airdrop_token}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                throw new Error(error);
            }
        };
        fetchData();
    }, [airdrop_token]);

    // const jetonText = data.jeton === '0' ? 'Купить жетон' : 'Вы уже участвуете';


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div
            className={`h-screen flex flex-col ${theme === 'dark' ? 'bg-[#10152C] text-white' : 'bg-white text-black'}`}>
            <div className="fixed top-0 w-full z-10">
                <Header/>
                <div className={'mt-[17%] ml-7'}>
                    <RocketProgressBar/>
                </div>
            </div>

            <div
                className={`flex-grow p-2 rounded-xl shadow-lg max-w-xl mx-auto mt-[30%] rounded-t-3xl z-20 relative
                ${theme === 'dark' ? 'bg-[#10152C] text-white' : 'bg-white text-black'}`}
                style={{
                    boxShadow : '0 4px 20px rgba(0, 255, 252, 0.5)',
                    borderTop : '1px solid #00FFFC'
                }}
            >
                <div className="h-[63vh] mb-2 w-[96vw] p-3">
                    {/* Изображение */}
                    <div className="max-w-sm">
                        <img
                            src={game.icon}
                            alt="Base64"
                            className="rounded-3xl h-[30vh] w-[98vw]"
                        />
                    </div>

                    <div className="text-center">
                        <h1 className="text-3xl font-lego font-bold">{game.title}</h1>
                    </div>

                    <div className="h-[28vh] overflow-y-auto mb-4">
                        {Object.keys(game.descriptions).map(key => (
                            <p key={key} className="mb-4">
                                {game.descriptions[key]}
                            </p>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4">
                        {game.jeton === '0' ?
                            <button
                                className="bg-gradient-to-r from-[#02F9FD] to-[#CA59FF] text-white font-bold py-1 px-[10vw] rounded-lg shadow-lg duration-200">
                                Купить жетон
                            </button>
                            :
                            <h1 className="text-3xl font-lego font-bold">Вы уже участвуете!</h1>
                        }
                    </div>
                </div>
                <div className="fixed bottom-3 left-0 w-full mx-auto">
                    <SideBar/>
                </div>
            </div>
        </div>
    );
};

export default Nft;