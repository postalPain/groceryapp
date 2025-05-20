import { slowResponse } from '../../utils';
import type { IGroceryList } from './types.ts';

const API_URL = 'http://0.0.0.0:3000';




const queries = {
    groceries: {
        lists: {
            queryKey: ['grocery-lists'],
            queryFn: (): Promise<IGroceryList[]> =>
                fetch(`${API_URL}/grocery-lists`)
                    .then((res) => res.json())
                    .then(slowResponse),
        },
        getList: (id: string) => ({
            queryKey: ['grocery-list', id],
            queryFn: (): Promise<IGroceryList> =>
                fetch(`${API_URL}/grocery-lists/${id}`)
                    .then((res) => res.json())
                    .then(slowResponse),
        }),
        createList: {
            mutationFn: (data: Partial<IGroceryList>): Promise<IGroceryList> =>
                fetch(`${API_URL}/grocery-lists`, {
                    method: 'POST',
                    body: JSON.stringify(data)
                })
                    .then((res) => res.json())
                    .then(slowResponse),
        },
        updateList: {
            mutationFn: (data: Partial<IGroceryList>) =>
                fetch(`${API_URL}/grocery-lists/${data.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(data)
                })
                    .then((res) => res.json())
                    .then(slowResponse),
        }
    }
};

export default queries;
