// pages/customer.js
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CustomerPage() {
    const APIBASE = "/api/customer";  // assuming API is relative
    const [customers, setCustomers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm();

    useEffect(() => {
        fetchCustomers();
    }, []);

    async function fetchCustomers() {
        const res = await fetch(APIBASE);
        const data = await res.json();
        setCustomers(data.data);
    }

    async function onSubmit(data) {
        if (editMode) {
            await fetch(`${APIBASE}/${data._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        } else {
            await fetch(APIBASE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        }
        reset();
        setEditMode(false);
        fetchCustomers();
    }

    const editCustomer = (customer) => {
        setEditMode(true);
        setValue('_id', customer._id);
        setValue('name', customer.name);
        setValue('dateOfBirth', customer.dateOfBirth);
        setValue('memberNumber', customer.memberNumber);
        setValue('interests', customer.interests);
    };

    const deleteCustomer = async (id) => {
        await fetch(`${APIBASE}/${id}`, { method: "DELETE" });
        fetchCustomers();
    };

    return (
        <div>
            <h1>Customers</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("_id")} />
                <input {...register("name", { required: true })} placeholder="Name" />
                <input {...register("dateOfBirth", { required: true })} placeholder="Date of Birth" type="date" />
                <input {...register("memberNumber", { required: true })} placeholder="Member Number" type="number" />
                <input {...register("interests", { required: true })} placeholder="Interests" />
                <button type="submit">{editMode ? "Update" : "Add"} Customer</button>
            </form>

            <ul>
                {customers.map((customer) => (
                    <li key={customer._id}>
                        {customer.name} - {customer.interests}
                        <button onClick={() => editCustomer(customer)}>Edit</button>
                        <button onClick={() => deleteCustomer(customer._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
