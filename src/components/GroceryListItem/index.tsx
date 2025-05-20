import React from 'react';
import type {IGrocery} from '../../services/api/types.ts';
import {useTranslation} from 'react-i18next';
import { formatAmount } from '../../utils';
import Spinner from '../Spinner';

type GroceryListItemProps = IGrocery & {
    index: number;
    mode?: 'view' | 'edit';
    updating?: boolean;
    disabled?: boolean;
    onRemove?: (id: string) => void;
    onEdit?: (id: string) => void;
    onToggleBought?: (id: string) => void;
};

const GroceryListItem: React.FC<GroceryListItemProps> = ({
    id,
    name,
    amount,
    amountType,
    bought,
    index,
    mode = 'view',
    updating = false,
    disabled = false,
    onRemove,
    onEdit,
    onToggleBought,
}) => {
    const {t} = useTranslation();
    const isEdit = mode === 'edit';
    return (
        <li className={`flex justify-between gap-x-5 py-5 ${disabled ? ' pointer-events-none' : ''}`}>
            {(!isEdit && onToggleBought) && (
                <div className="flex items-center content-center w-4">
                    {!updating && <input type="checkbox" disabled={disabled} defaultChecked={bought} onChange={() => onToggleBought(id)} />}
                    {updating && (<Spinner size="small" />)}
                </div>
            )}
            <div className={`${bought ? 'line-through' : ''}`}>{index + 1}</div>
            {
                isEdit ? (
                    <div
                        className={`flex-1 ${bought ? 'line-through' : ''} hover:cursor-pointer text-green-700 underline-offset-2 hover:text-green-900`}
                        onClick={() => onEdit && onEdit(id)}
                    >
                        {`${name} (${formatAmount(amount, amountType)})`}
                    </div>
                ) : (
                    <div className={`flex-1 ${bought ? 'line-through' : ''}`}>
                        {`${name} (${formatAmount(amount, amountType)})`}
                    </div>
                )
            }
            {isEdit && (
                <div
                    className="hover:cursor-pointer text-sm text-red-700 underline-offset-2 hover:text-red-900"
                    onClick={() => onRemove && onRemove(id)}>
                    {t('remove')}
                </div>
            )}
        </li>
    )
}

export default GroceryListItem;
