'use server'

import { prisma } from "@/lib/prisma";
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
        description: z.string().min(1)
    });
    const parse = schema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
    });
    if (!parse.success) {
        return { message: 'Failed to create item' }
    }
    const { title, description } = parse.data;
    try {
        await prisma.item.create({
            data: {
                title,
                description,
                price: 100,
                userId: user.id
            }
        })

        revalidatePath('/');
        return { message: `Added item ${title}` }
    } catch (e) {
        console.log();

        return { message: `Failed to create item ${e}` }
    }
}