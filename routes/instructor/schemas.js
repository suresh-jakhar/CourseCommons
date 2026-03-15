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

const courseSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    price: z.number().min(0),
    imageUrl: z.string().url(),
    isFree: z.boolean()
}).refine(data => {
    if(!data.isFree && data.price <= 0) return false;
    return true;
}, { message: "Paid courses must have a price greater than 0" });

module.exports = {
    signupSchema,
    signinSchema,
    courseSchema
};
