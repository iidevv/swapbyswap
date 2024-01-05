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
        category: z.string().min(1),
        price: z.number().min(1),
        priceUpgrade: z.number().min(1),
        priceDowngrade: z.number().min(1),
        latitude: z.number().min(1),
        longitude: z.number().min(1),
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
        category: formData.get('category'),
        image: formData.get('image'),
        price: formData.get('image'),
        priceUpgrade: formData.get('price-upgrade'),
        priceDowngrade: formData.get('price-downgrade'),
        latitude: formData.get('latitude'),
        longitude: formData.get('longitude'),
    });

    if (!parse.success) {
        return { message: 'Failed to create item' }
    }

    const {
        title,
        description,
        category,
        image,
        price,
        priceUpgrade,
        priceDowngrade,
        latitude,
        longitude } = parse.data;

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
                category,
                ItemImage: {
                    create: [
                        {
                            name: fileName,
                            imageUrl: process.env.AWS_S3_URL + fileName
                        }
                    ]
                },
                price,
                priceUpgrade,
                priceDowngrade,
                latitude,
                longitude,
                userId: user.id
            }
        })

        revalidatePath('/');
        return { message: `Added item ${title}` }
    } catch (e) {
        return { message: `Failed to create item ${e}` }
    }
}

export async function searchItem(prevState: any, formData: FormData) {
    try {

        const schema = z.object({
            search: z.string().min(1).max(50)
        });

        const parse = schema.safeParse({
            search: formData.get('search'),
        });
        if (!parse.success) {
            return { message: 'Failed. Try again' }
        }
        const { search } = parse.data;

        const response = await prisma.item.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            include: {
                ItemImage: true
            },
            take: 5
        });

        if (!response || response.length === 0) {
            return {
                message: `No results`
            }
        }
        return {
            results: response
        };
    } catch (e) {
        return { message: `No results` }
    }
}