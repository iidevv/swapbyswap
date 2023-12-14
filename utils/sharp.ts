import sharp from "sharp";

export async function optimizeImage(buffer: Buffer) {
    try {
        const optimizedBuffer = await sharp(buffer)
            .resize(800)
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .jpeg({ quality: 90 })
            .toBuffer();
        return optimizedBuffer;
    } catch (error) {
        console.log(error);
    }
}
