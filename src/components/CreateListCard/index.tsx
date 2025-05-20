import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../ui/card';
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import type {IGroceryList} from '../../services/api/types.ts';


type CreateListCardProps = {
    onCancel: () => void;
    onSubmit: (data: Partial<IGroceryList>) => void;
}
const CreateListCard: React.FC<CreateListCardProps> = ({
    onCancel,
    onSubmit,
}) => {
    const { t } = useTranslation();
    const [listName, setListName] = useState<string>('');
    const onListFormSubmit = () => {
        if (listName) {
            onSubmit({ name: listName, groceries: [] });
        }
    };
    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-primary opacity-60 transition-opacity animate-fade-out"
            />
            <div
                className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            >
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>{t('create_list_card_title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">{t('create_list_card_name_label')}</Label>
                                <Input
                                    id="name"
                                    required
                                    autoFocus
                                    placeholder={t('create_list_card_name_placeholder')}
                                    onChange={e => setListName(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={onCancel}>{t('cancel')}</Button>
                        <Button onClick={onListFormSubmit}>{t('create')}</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};

export default CreateListCard;
