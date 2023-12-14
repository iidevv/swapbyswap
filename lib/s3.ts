import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { optimizeImage } from "@/utils/sharp";

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!
    }
})

export async function uploadFileToS3(file: File) {
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const optimizedBuffer = await optimizeImage(fileBuffer);

    const fileName = file.name;

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${fileName}`,
        Body: optimizedBuffer,
        ContentType: "image/jpg"
    }

    const command = new PutObjectCommand(params);
    try {
        await s3Client.send(command);

        return fileName;
    } catch (e) {
        throw new Error(`Error: ${e}`);
    }
}