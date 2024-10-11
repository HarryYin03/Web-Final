// seed.js
const dbConnect = require('./lib/db');
const Customer = require('./models/Customer');

const customers = [
    {
        name: "John Doe",
        dateOfBirth: "1990-01-01",
        memberNumber: 1,
        interests: "movies, football",
    },
    {
        name: "Jane Smith",
        dateOfBirth: "1988-05-15",
        memberNumber: 2,
        interests: "reading, traveling",
    },
    {
        name: "Alice Johnson",
        dateOfBirth: "1995-09-23",
        memberNumber: 3,
        interests: "gaming, sports",
    },
];

const seedDatabase = async () => {
    await dbConnect();
    await Customer.deleteMany({});
    await Customer.insertMany(customers);
    console.log("Database seeded!");
    process.exit();
};

seedDatabase().catch(err => {
    console.error(err);
    process.exit(1);
});
