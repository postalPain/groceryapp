import React, { useState } from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import { Input } from '../ui/input.tsx';
import { Button } from '../ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {zodResolver} from '@hookform/resolvers/zod';
import { z } from 'zod';
import {useForm} from 'react-hook-form';

import GroceryListItem from '../GroceryListItem';
import type {IGroceryList, IGrocery} from '../../services/api/types.ts';
import Grocery from '../Grocery';
import queries from '../../services/api/queries.ts';
import {Separator} from '../ui/separator.tsx';
import ScreenLoader from '../ScreenLoader';
import MessageBox from '../MessageBox';


const formSchema = z.object({
    id: z.string(),
    name: z.string().nonempty(),
});


type GroceryListProps = {
    data?: IGroceryList;
}
const GroceryList: React.FC<GroceryListProps> = ({
    data,
}) => {
    const {t} = useTranslation();
    const { mutate: updateList } = useMutation(queries.groceries.updateList);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [groceryItemRemoveId, setGroceryItemRemoveId] = useState<string | undefined>();
    const queryClient = useQueryClient();
    const [editGroceryId, setEditGroceryId] = useState<string | undefined>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: data?.id,
            name: data?.name,
        },
    });
    const onConfirmItemRemove = () => {
        if (data?.groceries) {
            const id = groceryItemRemoveId;
            const itemIndex = data.groceries.findIndex(item => item.id === id);
            const newGroceries = [
                ...data!.groceries.slice(0, itemIndex),
                ...data!.groceries.slice(itemIndex + 1),
            ];
            setGroceryItemRemoveId(undefined);
            setIsUpdating(true);
            updateList({
                id: data.id,
                groceries: newGroceries,
            }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({queryKey: ['grocery-list', data.id]});
                    setIsUpdating(false);
                }
            });
        }
    };
    const onListItemRemove = (id: string) => {
        setGroceryItemRemoveId(id);
    };
    const onListItemEdit = (id: string) => {
        setEditGroceryId(id);
    };
    const onGroceryEditClose = () => {
        setEditGroceryId(undefined);
    };
    const onGroceryEdit = (grocery: IGrocery) => {
        setEditGroceryId(undefined);
        if (data?.groceries) {
            const isNew = grocery.id === 'new';
            let newGroceries: IGrocery[];
            if (isNew) {
                const newId = `${Math.random().toString(10).slice(2, 8)}`;
                newGroceries = [...data.groceries, { ...grocery, id: newId }];
            } else {
                newGroceries = data.groceries.map((g) => {
                    if (g.id === grocery.id) {
                        return {
                            ...g,
                            ...grocery,
                        }
                    }
                    return g;
                });
            }
            setIsUpdating(true);
            updateList({
                id: data.id,
                groceries: newGroceries,
            }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries({queryKey: ['grocery-list', data.id]});
                    setIsUpdating(false);
                }
            });
        }
    };
    const onNewGroceryClick = () => {
        setEditGroceryId('new')
    }
    const groceryData = data?.groceries.find(item => item.id === editGroceryId) || { id: editGroceryId } as Partial<IGrocery>;
    const onListFormSubmit = (data: Partial<IGroceryList>) => {
        setIsUpdating(true);
        updateList({
            ...data,
        }, {
            onSuccess: () => {
                setIsUpdating(false);
            }
        });
    };

    return (
        <div>
            {isUpdating && <ScreenLoader />}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onListFormSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        name="id"
                        render={({ field }) => (
                            <Input {...field} type="hidden" />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="mb-6">
                                <FormLabel>{t('grocery_list_edit_form_name')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('grocery_list_edit_form_placeholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">{t('update')}</Button>
                </form>
            </Form>
            <div className="flex items-baseline mt-10">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight flex-1 mb-4">{t('list_edit_groceries')}</h2>
                <div>
                    <span
                        className="hover:cursor-pointer text-yellow-700 underline-offset-2 hover:text-yellow-900"
                        onClick={onNewGroceryClick}>
                            {t('list_edit_add_grocery')}
                    </span>
                </div>
            </div>
            <Separator />
            {!data
                ? <div>Grocery list is empty</div>
                : (
                    <ul className="divide-y divide-gray-100">
                        {data.groceries.map((item, index) => (
                            <GroceryListItem
                                key={item.id}
                                index={index}
                                mode="edit"
                                {...item}
                                onRemove={onListItemRemove}
                                onEdit={onListItemEdit}
                            />
                        ))}
                    </ul>
                )
            }
            {!!editGroceryId && (
                <Grocery
                    initData={groceryData}
                    onClose={onGroceryEditClose}
                    onSubmit={onGroceryEdit}
                />
            )}
            {!!groceryItemRemoveId && (
                <MessageBox
                    title={t('message_box_title')}
                    message={t('grocery_remove_mb_message')}
                    onCancel={() => setGroceryItemRemoveId(undefined)}
                    onConfirm={onConfirmItemRemove}
                />
            )}
        </div>
    )
}

export default GroceryList;
