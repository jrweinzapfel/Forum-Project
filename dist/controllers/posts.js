import prisma from '../prisma.js';
export const getPosts = async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json({ posts });
};
export const createPost = async (req, res) => {
    const body = req.body;
    body.userId = req.user.id;
    const post = await prisma.post.create({
        data: body,
    });
    res.status(201).json(post);
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
    const postId = req.user.id;
    const post = await prisma.user.update({
        where: { id: postId },
        data: req.body,
    });
    res.json({ post });
};
export const deletePost = async (req, res) => {
    const postId = req.user.userId;
    const post = await prisma.post.delete({
        where: { id: postId },
    });
    res.sendStatus(200);
};
export const createLike = async (req, res) => {
    const postId = Number.parseInt(req.params.id);
    const userId = req.user.id;
    console.log(userId);
    const post = await prisma.post.update({
        where: { id: postId },
        data: {
            likes: {
                connect: {
                    id: userId,
                },
            },
        },
        include: {
            _count: true
        }
    });
    res.status(201).json({ postLikeCount: post._count.likes });
};
export const deleteLike = async (req, res) => {
    const userId = req.user.userId;
    const postId = parseInt(req.params.id);
    const post = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            likes: {
                disconnect: {
                    id: userId,
                },
            },
        },
        include: {
            _count: true,
        },
    });
    res.status(201).json({ postLikeCount: post._count.likes });
};
export const createFollow = async (req, res) => {
    const postId = Number.parseInt(req.params.id);
    const userId = req.user.id;
    console.log(userId);
    const post = await prisma.post.update({
        where: { id: postId },
        data: {
            follows: {
                connect: {
                    id: userId,
                },
            },
        },
        include: {
            _count: true
        }
    });
    res.status(201).json({ postFollowCount: post._count.follows });
};
export const deleteFollow = async (req, res) => {
    const postId = Number.parseInt(req.params.id);
    const userId = req.user.userId;
    console.log(userId);
    const post = await prisma.post.update({
        where: { id: postId },
        data: {
            follows: {
                disconnect: {
                    id: userId,
                },
            },
        },
        include: {
            _count: true
        }
    });
    res.status(201).json({ postFollowCount: post._count.follows });
};
export const getReplies = async (req, res, next) => {
    const postId = Number.parseInt(req.params.id);
    const post = await prisma.post.findUnique({
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
export const createReply = async (req, res) => {
    const postId = parseInt(req.body.id);
    const body = req.body;
    body.userId = req.user.id;
    const reply = await prisma.reply.create({
        data: body,
    });
    res.json({ reply });
};
