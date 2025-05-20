export interface IGroceryList {
    id: string;
    name: string;
    groceries: IGrocery[];
}

export interface IGrocery {
    id: string;
    name: string;
    amount: number;
    amountType: 'kg' | 'l' | 'unit';
    bought: boolean;
}
