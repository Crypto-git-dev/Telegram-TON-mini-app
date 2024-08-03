import React from 'react';
import SideBar from '../components/SideBar.jsx';
import useUser from '../http/hooks/useUser.js';
import backgroundImageDark from '../assets/rocketBgDark1.png';
import backgroundImage from '../assets/rocketBgWhite.png';


const Profile = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTExMTEsInVzZXJuYW1lIjoiZ3JlZ2VyZXJnIiwiYmlvIjp7ImZpcnN0X25hbWUiOiJxd3dlZnd3ZWYiLCJsYXN0X25hbWUiOiJlcmdlIiwibGFuZ3VhZ2UiOiJ3cWQifSwiaWF0IjoxNzIxOTMzMDcyfQ.aXM7KJjCutpqWEzEjwQr0CGAtpUKmz9Y-8HRhiooO-E';
    const {user, loading, error} = useUser(token);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const tg = window.Telegram.WebApp;
    const user1 = tg.initDataUnsafe.user;
    console.log(user1);
    const theme = tg.colorScheme;


    // eslint-disable-next-line react/prop-types
    const MenuItem = ({icon, title, rightContent}) => {
        return (
            <div className="flex items-center justify-between p-2 bg-[#E8F6FF] rounded-lg shadow-md mb-4">
                <div className="flex items-center">
                    <img src={icon} alt={title} className="w-6 h-6 mr-4"/>
                    <span className="text-lg font-bold text-black">{title}</span>
                </div>
                {rightContent && (
                    <div className="flex items-center text-black">
                        {rightContent}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="relative">
            <div className="absolute inset-0 bg-cover"
                 style={{
                     backgroundImage : `url(${theme === 'dark' ? `${backgroundImageDark}` : `${backgroundImage}`})`,
                     backgroundPosition : 'center -100px'
                 }}>
            </div>
            <div
                className={`flex flex-col h-screen relative z-10 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <img src={'/src/assets/headPerson.png'} alt="Profile"
                             className="w-18 h-16"/>
                        <div className="ml-2">
                            <div className="text-lg font-bold">Привет,</div>
                            <div className="text-md">{user1.first_name} {user1.last_name}</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <img src={`/src/assets/${theme === 'dark' ? 'levelDark.png' : 'level.png'}`}
                             className="w-12 h-12"/>
                        <div className="ml-2 text-lg">{user.profile_lvl} lvl</div>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        className="flex items-center justify-center w-80 py-2 rounded-full shadow-md text-black text-lg font-bold"
                        style={{
                            backgroundImage : `url('/src/assets/gradient1.jpg')`,
                            backgroundSize : 'cover',
                            backgroundPosition : 'center',
                            backgroundRepeat : 'no-repeat'
                        }}>
                        <img src={'/src/assets/coin.png'} className="w-6 h-4 mr-2"/>
                        Подключить кошелек
                    </button>
                </div>

                <div className="w-full px-4 flex justify-center">
                    <img src={'/src/assets/rocketLine.png'}/>
                </div>

                <div className="p-4">
                    <MenuItem
                        icon="/src/assets/idIcon.png"
                        title="Мой ID"
                        rightContent={<span className="text-lg">{user.id}</span>}
                    />
                    <MenuItem
                        icon="/src/assets/languageIcon.png"
                        title="Язык"
                        rightContent={<span className="flex items-center"><img src="/src/assets/rus.png"
                                                                               className="w-6 h-6 mr-2"/>Rus</span>}
                    />
                    <MenuItem
                        icon="/src/assets/themeIcon.png"
                        title="Тема"
                        rightContent={<span className="flex items-center"><img
                            src={`/src/assets/${theme === 'dark' ? 'darkThemeIcon.png' : 'lightThemeIcon.png'}`}
                            className="w-6 h-6 mr-2"/>{theme === 'dark' ? 'Темная' : 'Светлая'}</span>}
                    />
                    <MenuItem
                        icon="/src/assets/friendsIcon.png"
                        title="Пригласить друзей"
                    />
                    <MenuItem
                        icon="/src/assets/supportIcon.png"
                        title="Поддержка"
                    />
                </div>

                <div className="fixed bottom-3 left-0 w-full mx-auto">
                    <SideBar/>
                </div>
            </div>
        </div>
    );
};

export default Profile;