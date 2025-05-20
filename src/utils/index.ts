import type {IGrocery} from '../services/api/types.ts';
import i18next from '../services/i18n';

const wait = (time = 1000) =>
    new Promise(resolve => setTimeout(resolve, time));

export const slowResponse = async <T>(data: T): Promise<T> => {
    await wait(100);
    return data;
};

const vocAmount: Record<IGrocery['amountType'], string> = {
    kg: i18next.t('grocery_form_amount_type_kg'),
    l: i18next.t('grocery_form_amount_type_l'),
    unit: i18next.t('grocery_form_amount_type_units'),
}
export const formatAmount = (v: number, type: IGrocery['amountType']) => (
    `${v} ${vocAmount[type]}`
)
