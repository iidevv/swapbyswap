import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// async function main() {
//     const user = await prisma.user.upsert({
//         where: { email: 'test@test.com' },
//         update: {},
//         create: {
//             email: 'test@test.com',
//             name: 'Test User',
//             password: `$2y$12$GBfcgD6XwaMferSOdYGiduw3Awuo95QAPhxFE0oNJ.Ds8qj3pzEZy`
//         }
//     })
//     console.log({ user })
// }
// main()
//     .then(() => prisma.$disconnect())
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)

//     })
async function main() {
    const product = await prisma.item.create({
        data: {
            title: 'test',
            description: 'Description',
            price: 100,
            userId: '123'
        }
    });
    console.log({ product });
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });