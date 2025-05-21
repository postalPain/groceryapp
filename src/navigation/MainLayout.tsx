import React from 'react';
import { Outlet, useMatch } from 'react-router';
import Header from '../components/Header';


const MainLayout: React.FC = () => {
    const isMainPage = useMatch('/');

    return (
        <>
            <Header showBackButton={!isMainPage} />
            <Outlet />
        </>
    )
}

export default MainLayout;
