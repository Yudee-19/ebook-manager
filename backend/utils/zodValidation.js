// utils/zodValidation.js
const { name } = require('ejs');
const { z } = require('zod');

const signupSchema = z.object({
    name: z.string().min(3).max(40),
    email: z.string().min(7).max(30).email(),
    password: z.string().min(8).max(20)
});

const ebookSchema = z.object({
    title: z.string().min(3).max(100),
    author: z.string().min(3).max(50),
    genre: z.string().min(3).max(30).optional(),
    description: z.string().min(3).max(30).optional(),
});

const signinSchema = z.object({
    email: z.string().min(7).max(30).email(),
    password: z.string().min(1, "Password is required")
});

module.exports = {
    signupSchema,
    signinSchema,
    ebookSchema,
};
