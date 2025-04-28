import prisma from '../prisma.js';
export const getPosts = async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json({ posts });
};
export const createPost = (req, res) => {
    res.json({ message: 'hit' });
};
export const getPost = async (req, res, next) => {
    const postId = Number.parseInt(req.params.id);
    const post = await prisma.user.findUnique({
        where: { id: postId },
        include: {
            replies: true,
            _count: true,
        }
    });
    if (!post) {
        return next(new Error('404'));
    }
    res.json({ post });
};
export const updatePost = async (req, res) => {
    const postId = Number.parseInt(req.params.id);
    const post = await prisma.user.update({
        where: { id: postId },
        data: req.body,
    });
    res.json({ post });
};
export const deletePost = async (req, res) => {
    const postId = Number.parseInt(req.params.id);
    const post = await prisma.post.delete({
        where: { id: postId },
    });
    res.sendStatus(200);
};
export const createLike = (req, res) => {
    res.json({ message: 'hit' });
};
export const deleteLike = (req, res) => {
    res.json({ message: 'hit' });
};
export const createFollow = (req, res) => {
    res.json({ message: 'hit' });
};
export const deleteFollow = (req, res) => {
    res.json({ message: 'hit' });
};
export const getReplies = async (req, res, next) => {
    const postId = Number.parseInt(req.params.id);
    const post = await prisma.user.findUnique({
        where: { id: postId },
        include: {
            replies: true,
            _count: true,
        }
    });
    if (!post) {
        return next(new Error('404'));
    }
    res.json({ replies: post.replies });
};
export const createReply = (req, res) => {
    res.json({ message: 'hit' });
};
