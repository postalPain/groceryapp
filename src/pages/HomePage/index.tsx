import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import queries from '../../services/api/queries.ts';
import GroceryList from '../../components/GroceryList';

const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const { isPending, error, data } = useQuery(queries.groceries);
    console.log(data);
    console.log(t);
    return (
        <div>
            {t('welcome')}
            <GroceryList data={data} />
        </div>
    )
};

export default HomePage;
