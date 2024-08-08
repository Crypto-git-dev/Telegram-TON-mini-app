import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import RocketProgressBar from '../components/RocketProgressBar.jsx';
import useUser from '../http/hooks/useUser.js';
import {createJWT, createUnixTime, generateUserToken} from '../utils.js';


const Nft = () => {
    const tg = window.Telegram.WebApp;
    const userTg = tg.initDataUnsafe.user;
    const theme = tg.colorScheme;

    const secretKey = import.meta.env.VITE_SECRET_KEY;
    const robot = {
        id : '66b30d5dd8149c8ec0b76b52',
        data : createUnixTime(),
    };
    const tokenRobo = createJWT(robot, secretKey);
    const token = generateUserToken(userTg);
    const {user, loading, error} = useUser(token);


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
                    {/*        {tokenRobo}*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                    {/*<div className="max-w-sm p-4 m-4">*/}
                    {/*    <p className="break-words">*/}
                    {/*        {tokenRobo}*/}
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