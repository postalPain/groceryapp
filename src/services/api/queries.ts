const API_URL = 'http://localhost:3000';

const queries = {
    groceries: {
        queryKey: ['groceries'],
        queryFn: () =>
            fetch(`${API_URL}/groceries`).then((res) => res.json())
    }
};

export default queries;
