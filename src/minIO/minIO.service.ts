import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import {MinIORequestDTO, MinIOResponseDTO} from "./dto/interfaces";

// Inside your service or module
const minioClient = new Minio.Client({
    endPoint: process.env.MIN_IO_BUCKET_URL,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MIN_IO_ACCESS_KEY,
    secretKey: process.env.MIN_IO_SECRET_KEY
});

@Injectable()
export class MinIOService {

    async savePrediction(request: MinIORequestDTO, bucket_name: string): Promise<MinIOResponseDTO> {
        let resp: MinIOResponseDTO;
        await minioClient.fPutObject(bucket_name, request.imgId, request.filePath, function(err, etag) {
            if (err) {
                console.log('Error uploading object: ', err);
                resp = {success: false, etag};
                return resp;
            } else {
                console.log('Successfully uploaded object with ETag: ', etag);
                resp = {success: true, etag};
            }
        });
        return resp;
    }
}