import { useEffect, useState } from 'react';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('/api/customer')
            .then(response => response.json())
            .then(data => setCustomers(data));
    }, []);

    return (
        <ul>
            {customers.map(customer => (
                <li key={customer._id}>
                    {customer.name} - {customer.interests}
                </li>
            ))}
        </ul>
    );
}
