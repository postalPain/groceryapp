import React from 'react';
import type {IGrocery} from '../../services/api/types.ts';

type GroceryListProps = {
    data?: IGrocery[];
}
const GroceryList: React.FC<GroceryListProps> = ({
    data,
}) => {

    if (!data) {
        return (
            <div>Grocery list is empty</div>
        )
    }
    return (
        <div>
            <ul className="divide-y divide-gray-100">
                {data.map((item, index) => (
                    <li
                        key={item.id}
                        className="flex justify-between gap-x-6 py-5 px-5"
                    >
                        <div>{index + 1}</div>
                        <div className="flex-1">
                            {`${item.name} (${item.amount})`}
                        </div>
                        <div>remove</div>
                        <div>
                            {item.bought ? 'Yes' : 'No'}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GroceryList;
