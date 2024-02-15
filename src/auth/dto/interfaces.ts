import {Role} from "../../users/models/role.model";
import {ApiProperty} from "@nestjs/swagger";

export class authRequest {

    @ApiProperty()
    readonly username: string;

    @ApiProperty()
    readonly password: string;

}

export interface registerResponse {
    id: number,
    username: string,
    role: Role
}

export interface loginResponse {
    access_token: string
}