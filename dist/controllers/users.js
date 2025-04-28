import prisma from '../prisma.js';
export const getUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json({ users });
};
export const createUser = async (req, res, next) => {
    const user = await prisma.user.create({
        data: req.body,
    });
    res.status(201).json({ user });
};
export const getUser = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.findFirst({
        where: { id: id },
    });
    if (!user) {
        return next(new Error('404'));
    }
    res.json({ user });
};
export const updateUser = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.update({
        where: { id: id },
        data: req.body
    });
    res.json(user);
};
export const deleteUser = async (req, res) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.delete({
        where: { id: id }
    });
    res.sendStatus(200);
};
export const getUserPosts = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            posts: true,
        },
    });
    if (!user) {
        return next(new Error('404'));
    }
    res.send({ posts: user.posts });
};
export const getUserLikedPosts = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            postsLiked: true,
        },
    });
    if (!user) {
        return next(new Error('404'));
    }
    res.send({ posts: user.postsLiked });
};
export const getUserFollowedPosts = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            postsFollowed: true,
        },
    });
    if (!user) {
        return next(new Error('404'));
    }
    res.send({ posts: user.postsFollowed });
};
