import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from '../pages/HomePage';


const AppRouter: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
