import {ApiProperty} from "@nestjs/swagger";

export class FileUploadDto {

    @ApiProperty({ type: 'string', format: 'binary' })
    file: Express.Multer.File;

}

export class PredictionRequestDTO {

    @ApiProperty()
    userId: number;

    @ApiProperty()
    save: boolean;

}

export class PredictionResponseDTO {

    constructor(pred: Buffer) {
        this.predication = pred;
    }

    setBaseEtag(etag: string) {
        this.baseImgEtag = etag;
    }

    setPredEtag(etag: string) {
        this.predImgEtag = etag;
    }
    @ApiProperty()
    predication: Buffer;

    @ApiProperty()
    predImgEtag?: string;

    @ApiProperty()
    baseImgEtag?: string;
}