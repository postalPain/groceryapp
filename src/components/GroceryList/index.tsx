import React, { useState } from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import GroceryListItem from '../GroceryListItem';
import type {IGroceryList} from '../../services/api/types.ts';
import queries from '../../services/api/queries.ts';


type GroceryListProps = {
    data: IGroceryList;
}
const GroceryList: React.FC<GroceryListProps> = ({
    data,
}) => {
    const { t } = useTranslation();
    const [updatingGroceryId, setUpdatingGroceryId] = useState<string | undefined>();
    const { mutate: updateList } = useMutation(queries.groceries.updateList);
    const queryClient = useQueryClient();
    const onListItemBoughtToggle = (id: string) => {
        const newGroceries = data.groceries.map((g) => {
            const updatedGrocery = { ...g };
            if (g.id === id) {
                updatedGrocery.bought = !g.bought;
            }
            return updatedGrocery;
        });
        setUpdatingGroceryId(id);
        updateList({
            id: data.id,
            groceries: newGroceries,
        }, {
            onSuccess: async () => {
                await queryClient.invalidateQueries({ queryKey: ['grocery-lists']});
                setUpdatingGroceryId(undefined);
            }
        });
    };
    const boughtGroceries = data.groceries.reduce((acc, g) => g.bought ? acc + 1 : acc, 0);


    return (
        <div>
            <div className="flex items-baseline">
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight flex-1 mb-4">{data.name}{!!data.groceries.length && <span> {`(${boughtGroceries}/${data.groceries.length})`}</span>}</h1>
                <div><Link className="hover:cursor-pointer text-yellow-700 underline-offset-2 hover:text-yellow-900" to={`/lists/${data.id}/edit`}>{t('edit')}</Link></div>
            </div>
            <ul className="divide-y divide-gray-100">
                {data.groceries.map((item, index) => (
                    <GroceryListItem
                        key={item.id}
                        index={index}
                        {...item}
                        updating={item.id === updatingGroceryId}
                        disabled={!!updatingGroceryId && updatingGroceryId !== item.id}
                        onToggleBought={onListItemBoughtToggle}
                    />
                ))}
            </ul>
        </div>
    )
}

export default GroceryList;
