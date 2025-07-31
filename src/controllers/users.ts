import express, { NextFunction, Request, Response } from 'express';
import prisma from '../prisma.js';
import { RequestHandler } from 'express-serve-static-core';
import bcrypt from 'bcrypt';

export const getUsers: RequestHandler = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json({ users });
};

export const getUser: RequestHandler = async (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const user = await prisma.user.findFirst({
        where: { id: id },
    });
    if (!user) {
        return next(new Error('404'));
    }

    res.json({ user });
};

export const updateUser: RequestHandler = async (req, res) => {
    const id = req.user.id
    const user = await prisma.user.update({
        where: { id: id },
        data: req.body
    });

    res.json(user);
}

export const deleteUser: RequestHandler = async (req, res) => {
    const id = req.user.id;
    const user = await prisma.user.delete({
        where: { id: id }
    });
    res.sendStatus(200);
}

export const adminDeleteUser: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await prisma.user.delete({
        where: { id: id }
    });
    res.sendStatus(200);
}

export const getUserPosts: RequestHandler = async (req, res, next) => {
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
}

export const getUserLikedPosts: RequestHandler = async (req, res, next) => {
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
}

export const getUserFollowedPosts: RequestHandler = async (req, res, next) => {
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
}

