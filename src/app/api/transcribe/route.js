import { GetTranscriptionJobCommand, StartTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";

function getClient() {
    return new TranscribeClient({
        region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
    });
}

function createTranscribeCommand(fileName) {
    return new StartTranscriptionJobCommand({
        TranscriptionJobName: fileName,
        Media: {
            MediaFileUri: `s3://` + process.env.BUCKET_NAME + '/' + fileName,
        },
        MediaFormat: 'mp4',
        OutputBucketName: process.env.BUCKET_NAME,
        OutputKey: fileName + '.transcription',
        IdentifyLanguage: true,
    });
}

export async function GET(req) {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const fileName = searchParams.get('filename');

    const transcribeClient = getClient();

    const transcriptionJobStatusCommand = new GetTranscriptionJobCommand({
        TranscriptionJobName: fileName,
    });

    let exists = false;
    try {
        const jobStatusResult = await transcribeClient.send(transcriptionJobStatusCommand);
        exists = true;
    } catch (error) {
        
    }

    console.log({exists});

    if (!exists) {
    const transcriptionCommand = createTranscribeCommand(fileName);
    const result = await transcribeClient.send(transcriptionCommand);
    }

    return Response.json(result);
}