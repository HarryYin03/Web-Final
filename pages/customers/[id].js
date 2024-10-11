import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function CustomerDetail() {
    const router = useRouter();
    const { id } = router.query;
    const APIBASE = process.env.NEXT_PUBLIC_API_URL;
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`${APIBASE}/customers/${id}`)
                .then((res) => res.json())
                .then((data) => setCustomer(data.data));
        }
    }, [id]);

    if (!customer) return <p>Loading...</p>;

    return (
        <div>
            <h1>{customer.name}</h1>
            <p>Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</p>
            <p>Member Number: {customer.memberNumber}</p>
            <p>Interests: {customer.interests}</p>
            <button onClick={() => router.back()}>Back to List</button>
        </div>
    );
}
