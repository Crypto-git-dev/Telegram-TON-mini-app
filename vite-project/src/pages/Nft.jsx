import Header from '../components/Header.jsx';
import SideBar from '../components/SideBar.jsx';
import RocketProgressBar from '../components/RocketProgressBar.jsx';
import useUser from '../http/hooks/useUser.js';
import {createJWT} from '../utils.js';
import {useEffect, useState} from 'react';
import UserEndpoints from '../http/users/usersEndPoints.js';


const Nft = () => {
    const tg = window.Telegram.WebApp;
    const userTg = tg.initDataUnsafe.user;
    const theme = tg.colorScheme;

    const secretKey = import.meta.env.VITE_SECRET_KEY;
    const payload = {
        id : userTg.id,
        username : userTg.username,
        bio : {
            first_name : userTg.first_name,
            last_name : userTg.last_name,
            language : userTg.language_code
        },
    };
    console.log(payload);
    const token = createJWT(payload, secretKey);
    const {user, loading, error} = useUser(token);
    const [error1, setError] = useState(null);

    const [data, setData] = useState({});

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`http://5.42.101.72:8001/api/v1/users/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzc2NjU5NjQ5LCJ1c2VybmFtZSI6ImdhbGlhc2thcm92aWx5YXMiLCJiaW8iOnsiZmlyc3RfbmFtZSI6IklseWFzIiwibGFzdF9uYW1lIjoiR2FsaWFza2Fyb3YiLCJsYW5ndWFnZSI6InJ1In19.XeUc9RdnzGcMrvVtCBZYU2sYNBnM7uU4kbW4zfmgO5k`, {
    //                 method : 'GET',
    //             });
    //             console.log(1);
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //
    //             const data = await response.json();
    //             setData(data);
    //         } catch (error) {
    //             setError(error);
    //         }
    //     };
    //
    //     fetchData();
    // }, [token]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://5.42.101.72:8001/api/v1/users/${token}`, {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error);
        } finally {
            // setLoading(false);
        }
    };


    const handleClick = async () => {
        const response = await UserEndpoints.example({kkkk : lll});
        setData(response);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    console.log(222);
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
                    {/*        {token} hhh*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                    {/*<div className="max-w-sm p-4 m-4">*/}
                    {/*    <p className="break-words">*/}
                    {/*        {JSON.stringify(data, null, 2)} 11*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                    {/*<button*/}
                    {/*    onClick={fetchData}*/}
                    {/*    className="px-4 py-2 mb-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"*/}
                    {/*>*/}
                    {/*    Отправить POST-запрос*/}
                    {/*</button>*/}

                </div>
                <div className="fixed bottom-3 left-0 w-full mx-auto">
                    <SideBar/>
                </div>
            </div>
        </div>
    );
};

export default Nft;