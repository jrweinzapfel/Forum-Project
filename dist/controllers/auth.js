import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';
import bcrypt from 'bcrypt';
import env from 'dotenv';
env.config();
const JWT_SECRET = process.env.JWT_SECRET;
export const login = async (req, res) => {
    const { username } = req.body;
    const user = await prisma.user.findFirst({
        where: { username },
        include: { password: true },
    });
    if (!user) {
        res.status(401).json({ message: 'Invalid username' });
        return;
    }
    if (!user.password?.hash) {
        res.status(401).json({ message: 'error with username or password' });
        return;
    }
    const passwordValid = await bcrypt.compare(req.body.password, user.password.hash);
    if (!passwordValid) {
        res.status(401).json({ message: 'Invalid password' });
        return;
    }
    const token = jwt.sign({ id: user.id, username: user.username, roles: user.roles }, JWT_SECRET, {
        expiresIn: '6h',
    });
    res.json({ token });
};
export const register = async (req, res, next) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log(hashedPassword);
    const user = await prisma.user.create({
        data: {
            ...req.body, password: {
                create: { hash: hashedPassword }
            }
        },
    });
    res.status(201).json({ user });
};
