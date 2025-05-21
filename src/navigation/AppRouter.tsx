import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from '../pages/HomePage';
import GroceryListEditPage from '../pages/GroceryListEditPage';
import MainLayout from './MainLayout.tsx';


const AppRouter: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/lists/:id/edit" element={<GroceryListEditPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
