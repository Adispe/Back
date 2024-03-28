export interface MinIORequestDTO {
    imgId: string,
    filePath: string,
}

export interface MinIOResponseDTO {
    success: boolean,
    etag: string,
}