import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import queries from '../../services/api/queries.ts';
import GroceryListEdit from '../../components/GroceryListEdit';
import Header from '../../components/Header';
import ScreenLoader from '../../components/ScreenLoader';


const GroceryListEditPage: React.FC = () => {
    const { t } = useTranslation();
    const { id = '' } = useParams();
    const { isPending, error, data } = useQuery(queries.groceries.getList(id));

    const renderContent = () => (
        <>
            <h1 className="text-4xl mb-8 font-bold">{t('grocery_list_edit_page')}</h1>
            <GroceryListEdit data={data}/>
        </>
    );

    if (error) {
        return (
            <div>{t('serverError')}</div>
        )
    }

    return (
        <>
            <Header showBackButton />
            <div className="p-5">
                {!isPending && renderContent()}
            </div>
            {isPending && <ScreenLoader />}
        </>
    )
};

export default GroceryListEditPage;
