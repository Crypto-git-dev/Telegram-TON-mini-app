import React from 'react';
import {useRoutes} from 'react-router';
import {Helmet} from 'react-helmet';
import {useLocation} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Tasks from './pages/Tasks.jsx';
import Profile from './pages/Profile.jsx';
import AirDrop from './pages/AirDrop.jsx';
import Nft from './pages/Nft.jsx';
import BuySubcribe from './pages/BuySubcribe.jsx';
import ChooseSubscribe from './pages/ChooseSubscribe.jsx';

export const RouteList = [
    {
        path : '/',
        title : 'Главная',
        element : <Home/>,
    },
    {
        path : '/tasks',
        title : 'Задания',
        element : <Tasks/>,
    },
    {
        path : '/profile',
        title : 'Профиль',
        element : <Profile/>,
    },
    {
        path : '/airdrop',
        title : 'AirDrop',
        element : <AirDrop/>,
    },
    {
        path : '/nft',
        title : 'NFT',
        element : <Nft/>,
    },
    {
        path : '/buy-subscribe',
        title : 'Buy',
        element : <BuySubcribe/>,
    },
    {
        path : '/choose-subscribe',
        title : 'Buy',
        element : <ChooseSubscribe/>,
    },
];

const Router = () => {
    const routeElement = useRoutes(RouteList);
    const location = useLocation();
    const firstSegment = location.pathname.split('/')[1];
    const currentRoute = RouteList.find(route => route.path.split('/')[1] === firstSegment);
    console.log('Location:', location);
    console.log('Current Route:', currentRoute);

    return (
        <>
            <Helmet>
                <title>{currentRoute?.title || 'Заголовок по умолчанию'}</title>
            </Helmet>
            {routeElement}
        </>
    );
};

export default Router;
