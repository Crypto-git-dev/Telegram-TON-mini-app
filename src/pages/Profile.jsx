import React, {useState} from 'react';
import SideBar from '../components/SideBar.jsx';
import useUser from '../http/hooks/useUser.js';
import backgroundImageDark from '/assets/rocketBgDark1.png';
import backgroundImage from '/assets/rocketBgWhite.png';
import {generateUserToken} from '../utils.js';


const Profile = () => {
    const [copyStatus, setCopyStatus] = useState('');

    const tg = window.Telegram.WebApp;
    const userTg = tg.initDataUnsafe.user;
    const theme = tg.colorScheme;
    const token = generateUserToken(userTg);
    const {user, loading, error} = useUser(token);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    const handleCopy = () => {
        const inviteLink = `https://t.me/TONix_Hub_BOT?start=ref=${userTg.id}`; // Сформируйте вашу ссылку здесь
        navigator.clipboard.writeText(inviteLink).then(() => {
            setCopyStatus('Скопировано!');
            setTimeout(() => setCopyStatus(''), 3000); // Очистка сообщения через 3 секунды
        }).catch(err => {
            console.error('Ошибка при копировании: ', err);
        });
    };

    const handleSupportClick = () => {
        const supportLink = 'https://t.me/TONixHubSupport'; // Ваша ссылка на поддержку здесь
        window.open(supportLink, '_blank');
    };

    const handleClick = (title) => {
        if (title === 'Пригласить друзей') {
            handleCopy();
        } else if (title === 'Поддержка') {
            handleSupportClick();
        }
    };

    const MenuItem = ({icon, title, rightContent}) => {
        return (
            <div
                className={`flex items-center justify-between p-2 bg-[#E8F6FF] rounded-lg shadow-md mb-4 ${title === 'Пригласить друзей' ? 'cursor-pointer' : ''}`}
                onClick={() => handleClick(title)}
            >
                <div className="flex items-center">
                    <img src={icon} alt={title} className="w-6 h-6 mr-4"/>
                    <span className="text-lg font-bold text-black">{title}</span>
                </div>
                <div className="flex items-center text-black">
                    {title === 'Пригласить друзей' ? copyStatus : rightContent}
                </div>
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
                        <img src={'/assets/headPerson.png'} alt="Profile"
                             className="w-18 h-16"/>
                        <div className="ml-2">
                            <div className="text-lg font-bold">Привет,</div>
                            <div className="text-md">{userTg.first_name} {userTg.last_name}</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <img src={`/assets/${theme === 'dark' ? 'levelDark.png' : 'level.png'}`}
                             className="w-12 h-12"/>
                        <div className="ml-2 text-lg">{user.profile_lvl} lvl</div>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        className="flex items-center justify-center w-80 py-2 rounded-full shadow-md text-black text-lg font-bold"
                        style={{
                            backgroundImage : `url('/assets/gradient1.jpg')`,
                            backgroundSize : 'cover',
                            backgroundPosition : 'center',
                            backgroundRepeat : 'no-repeat'
                        }}>
                        <img src={'/assets/coin.png'} className="w-6 h-4 mr-2"/>
                        Подключить кошелек
                    </button>
                </div>

                <div className="w-full px-4 flex justify-center">
                    <img src={'/assets/rocketLine.png'}/>
                </div>

                <div className="p-4">
                    <MenuItem
                        icon="/assets/idIcon.png"
                        title="Мой ID"
                        rightContent={<span className="text-lg">{userTg.id}</span>}
                    />
                    <MenuItem
                        icon="/assets/languageIcon.png"
                        title="Язык"
                        rightContent={<span className="flex items-center"><img src="/assets/rus.png"
                                                                               className="w-6 h-6 mr-2"/>Rus</span>}
                    />
                    <MenuItem
                        icon="/assets/themeIcon.png"
                        title="Тема"
                        rightContent={<span className="flex items-center"><img
                            src={`/assets/${theme === 'dark' ? 'darkThemeIcon.png' : 'lightThemeIcon.png'}`}
                            className="w-6 h-6 mr-2"/>{theme === 'dark' ? 'Темная' : 'Светлая'}</span>}
                    />
                    <MenuItem
                        icon="/assets/friendsIcon.png"
                        title="Пригласить друзей"
                    />
                    <MenuItem
                        icon="/assets/supportIcon.png"
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