'use server'

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

import { prisma } from "@/lib/prisma";
import { uploadFileToS3 } from "@/lib/s3";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createItem(prevState: any, formData: FormData) {
    const session = await getServerSession();

    if (!session?.user.email) {
        return { message: 'Not authorized' }
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user.email
        }
    })

    if (!user?.id) {
        return { message: 'User not found' }
    }

    const schema = z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        image: z
            .any()
            .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported."
            ),
    });

    const parse = schema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        image: formData.get('image'),
    });

    if (!parse.success) {
        return { message: 'Failed to create item' }
    }

    const { title, description, image } = parse.data;

    if (!image) {
        return { message: 'Image not provided' }
    }

    let fileName = '';
    try {
        fileName = await uploadFileToS3(image);
    } catch (e) {
        return { message: `Failed to upload Image ${e}` }
    }
    try {
        await prisma.item.create({
            data: {
                title,
                description,
                imageUrl: fileName,
                price: 100,
                userId: user.id
            }
        })

        revalidatePath('/');
        return { message: `Added item ${title}` }
    } catch (e) {
        return { message: `Failed to create item ${e}` }
    }
}