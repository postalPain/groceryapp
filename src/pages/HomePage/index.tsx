import React, {useState} from 'react';
import { useNavigate } from 'react-router';
import {useMutation, useQuery} from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import queries from '../../services/api/queries.ts';
import GroceryList from '../../components/GroceryList';
import CreateListCard from '../../components/CreateListCard';
import type {IGroceryList} from '../../services/api/types.ts';
import ScreenLoader from '../../components/ScreenLoader';


const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isNewListCardVisible, setIsNewListCardVisible] = useState(false);
    const { isPending, error, data } = useQuery(queries.groceries.lists);
    const groceryList = data && data[0];
    const { mutate: newList, isPending: isCreationPending } = useMutation(queries.groceries.createList);

    const newListSubmitHandler = (d: Partial<IGroceryList>) => {
        newList(d, {
            onSuccess: (grocery) => {
                navigate(`/lists/${grocery.id}/edit`)
            }
        });
        setIsNewListCardVisible(false);
    };
    const newListCloseHandler = () => {
        setIsNewListCardVisible(false);
    };
    const renderContent = () => (
        <>
            {groceryList ?
                <GroceryList data={groceryList}/>
                : <div>{t('home_page_empty_list_0')} <span className="hover:cursor-pointer text-yellow-700 underline-offset-2 hover:text-yellow-900"
                    onClick={() => setIsNewListCardVisible(true)}>{t('home_page_create_list')}</span>.</div>
            }
            {isNewListCardVisible && (
                <CreateListCard
                    onCancel={newListCloseHandler}
                    onSubmit={newListSubmitHandler}
                />
            )}
        </>
    );

    if (error) {
        return (
            <div>{t('serverError')}</div>
        )
    }

    return (
        <div className="p-5">
            {!isPending && renderContent()}
            {(isPending || isCreationPending) && <ScreenLoader/>}
        </div>
    )
};

export default HomePage;
