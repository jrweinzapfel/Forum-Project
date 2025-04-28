import prisma from "./prisma.js";

await prisma.post.deleteMany();
await prisma.user.deleteMany();

await prisma.user.createMany({
    data: [
        { name: 'one', email: '1@email.com', username: 'one' },
        { name: 'two', email: '2@email.com', username: 'two' },
        { name: 'three', email: '3@email.com', username: 'three' },
    ],
});

const user = await prisma.user.findFirst();

await prisma.post.createMany({
    data: [
        {
            title: 'first post title',
            body: 'first post body',
            userId: user?.id!,
        },
        {
            title: 'second post title',
            body: 'second post body',
            userId: user?.id!,
        },
    ],
})