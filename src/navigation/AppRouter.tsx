import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from '../pages/HomePage';
import GroceryListEditPage from '../pages/GroceryListEditPage';


const AppRouter: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/lists/:id/edit" element={<GroceryListEditPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;
