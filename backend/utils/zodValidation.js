// utils/zodValidation.js
const { z } = require('zod');

const signupSchema = z.object({
    name: z.string().min(3).max(40),
    email: z.string().min(7).max(30).email(),
    password: z.string().min(8).max(20)
});

const ebookSchema = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string().optional(),
    description: z.string().optional(),
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
