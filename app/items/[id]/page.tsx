import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Image } from 'next/image';

const Page = async ({ params }: { params: { id: string } }) => {
    const item = await prisma.item.findUnique({
        where: {
            id: params.id
        },
        include: {
            ItemImage: true
        }
    });
    if (!item) return notFound();
    const { title, description, price, ItemImage: images } = item;

    return (
        <div className="grid md:grid-cols-2 gap-2">
            <div className="">
                {images.map((image) => (
                    <img key={image.id} src={image.imageUrl} alt={image.name} />
                ))}
            </div>
            <div className="">
                <h1>{title}</h1>
                <p>${price}</p>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Page