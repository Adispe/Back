import { Injectable } from '@nestjs/common';
import axios from "axios";
const FormData = require('form-data');

@Injectable()
export class IaApiService {

    async predicate(file: Express.Multer.File): Promise<any> {

        const form = new FormData();
        form.append('file', file.buffer, {filename: "test.jpg"});

        try {
            const response = await axios.post(process.env.API_IA_URL + '/predict', form,
                {headers: {"Content-Type": "multipart/form-data"}})
            return response;
        } catch (error) {
            throw new Error(`Error posting data to IA API: ${error.message}`);
        }
    }
}