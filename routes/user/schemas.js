const { z } = require("zod");

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().min(2),
    lastName: z.string().min(2)
});

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

const courseIdSchema = z.object({
    courseId: z.string().min(1)
});

const progressUpdateSchema = z.object({
    percentComplete: z.number().min(0).max(100)
});

module.exports = {
    signupSchema,
    signinSchema,
    courseIdSchema,
    progressUpdateSchema
};