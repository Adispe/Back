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

    constructor(pred: string, colors: any, classes: ClassAreas) {
        this.image_data = pred;
        this.class_areas = classes;
        this.class_colors = colors;
    }

    setBaseEtag(etag: string) {
        this.baseImgEtag = etag;
    }

    setPredEtag(etag: string) {
        this.predImgEtag = etag;
    }
    
    @ApiProperty()
    image_data: string;

    @ApiProperty()
    class_areas: ClassAreas;

    @ApiProperty()
    class_colors: any;

    @ApiProperty()
    predImgEtag?: string;

    @ApiProperty()
    baseImgEtag?: string;
}

interface ClassAreas {
    no_data: number,
    clouds: number,
    artificial: number,
    cultivated: number,
    broadleaf: number,
    coniferous: number,
    herbaceous: number,
    natural: number,
    snow: number,
    water: number
}