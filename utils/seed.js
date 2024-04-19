
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const tags = [
        { name: 'Dota 2' },
        { name: 'CS2' },
        { name: 'Overwatch 2' }
    ];

    for (const tag of tags) {
        await prisma.tag.create({ data: tag });
    }

    console.log('Seed data inserted successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });