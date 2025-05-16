import React from 'react';
import { useQuery } from '@tanstack/react-query';

import queries from '../../services/api/queries.ts';
import GroceryList from '../../components/GroceryList';

const HomePage: React.FC = () => {
    const { isPending, error, data } = useQuery(queries.groceries);
    console.log(data);
    return (
        <div>
            Home page
            <GroceryList data={data} />
        </div>
    )
};

export default HomePage;
