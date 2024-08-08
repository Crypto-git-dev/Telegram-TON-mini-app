import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import RocketProgressBar from '../components/RocketProgressBar.jsx';
import useUser from '../http/hooks/useUser.js';
import {createJWT, createUnixTime, generateUserToken} from '../utils.js';
import useRobot from '../http/hooks/useRobot.js';
import {useEffect, useState} from 'react';


const Nft = () => {
    const tg = window.Telegram.WebApp;
    const userTg = tg.initDataUnsafe.user;
    const theme = tg.colorScheme;

    const token = generateUserToken(userTg);
    const {user, loading, error} = useUser(token);

    const toni_token = user?.robot_id ? createJWT({
        id : user.id,
        robot_id : user.robot_id,
        data : createUnixTime(),
    }) : null;

    const userToken = createJWT({id : user.id, data : createUnixTime(),});

    const robotData = useRobot(toni_token);

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.tonixhub.com/api/v1/get_airdrops/{token}`);
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
    }, [toni_token]);

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
                }}>
                <div className="text-center">
                    <h1 className="text-3xl font-lego font-bold">Nft</h1>
                    <p className="text-xs">СКОРО</p>
                </div>
                <div className="h-[63vh] mb-2 w-[96vw]">

                    {/*<div className="max-w-sm p-4 m-4">*/}
                    {/*    <p className="break-words">*/}
                    {/*        {toni_token}*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                    {/*<div className="max-w-sm p-4 m-4">*/}
                    {/*    <p className="break-words">*/}
                    {/*        {task_token}*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                    {/*<div className="max-w-sm p-4 m-4">*/}
                    {/*    <p className="break-words">*/}
                    {/*        {JSON.stringify(data)}*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                </div>
                <div className="fixed bottom-3 left-0 w-full mx-auto">
                    <SideBar/>
                </div>
            </div>
        </div>
    );
};

export default Nft;