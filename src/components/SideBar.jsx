import React from 'react';
import {Link, useLocation} from 'react-router-dom';


const SideBar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const activeStyles = 'p-1 border-2 border-[#000F5E] bg-[#000F5E] rounded-lg b-0';

    return (
        <div className="flex items-center justify-around p-3 rounded-full shadow-lg"
             style={{
                 width : '96%',
                 maxWidth : '600px',
                 margin : ' auto',
                 backgroundImage : `url(/assets/gradient1.webp)`,
                 backgroundPosition : 'center',
                 backgroundSize : '150% 160%',
                 boxShadow : 'none',
             }}
        >
            <Link to="/">
                <div className={`${isActive('/') ? activeStyles : ''}`}>
                    <img src={`/assets/${isActive('/') ? 'playActive' : 'play'}.png`} className={`w-8 h-8`}/>
                </div>
            </Link>
            <Link to="/tasks">
                <div className={`${isActive('/tasks') ? activeStyles : ''}`}>
                    <img src={`/assets/${isActive('/tasks') ? 'tasksActive' : 'tasks'}.png`} className={`w-8 h-8`}/>
                </div>
            </Link>
            <Link to="/nft">
                <div className={`${isActive('/nft') ? activeStyles : ''}`}>
                    <img src="/assets/nft.png" className={`w-8 h-8`}/>
                </div>
            </Link>
            <Link to="/airdrop">
                <div className={`${isActive('/airdrop') ? activeStyles : ''}`}>
                    <img src={`/assets/${isActive('/airdrop') ? 'airdropActive' : 'airdrop'}.png`}
                         className={`w-8 h-8 `}/>
                </div>
            </Link>
            <Link to="/buy-subscribe">
                <div className={`${isActive('/buy-subscribe') ? activeStyles : ''}`}>
                    <img
                        src={`/assets/${isActive('/buy-subscribe' || '/choose-subscribe') ? 'personActive' : 'person'}.png`}
                        className={`w-8 h-8`}/>
                </div>
            </Link>
        </div>
    );
};

export default SideBar;