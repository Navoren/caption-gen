import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');
        const { name, type } = file;
        const data = await file.arrayBuffer();

        const s3client = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const newName = `${new Date().getTime()}-${name}`;

        const uploadCommand = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: newName,
            Body: data,
            ContentType: type,
            ACL: 'public-read',
        });

        await s3client.send(uploadCommand);

        return Response.json({
            message: 'File Uploaded Successfully',
            success: true,
            file: file,
            name: newName,
            type: type,
    })
    } catch (error) {
        return Response.json({ error: error.message },
            {status: 500})
    }
    
}