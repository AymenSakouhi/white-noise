import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { exists, existsSync, fstat } from "node:fs";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises"
import { join } from "node:path";

type UploadResponse = {
    bucket: string
    key: string
    uri: string
}

interface IFileStoreClient {
    upload: (bucketName: string, key: string, file: Uint8Array, contentType: string) => Promise<UploadResponse | undefined>
    get: (bucketName: string, key: string) => Promise<Uint8Array | null>
    delete: (bucketName: string, key: string) => Promise<void>
}

interface SupabaseUploadResponse extends UploadResponse {
    uri: string
}

export class SupabaseStorageClient implements IFileStoreClient {
    private _client: S3Client
    private _endpoint: string

    constructor(config: S3ClientConfig) {
        this._client = new S3Client(config)
        this._endpoint = config.endpoint as string
    }

    async upload(bucketName: string, key: string,  file: Uint8Array, contentType: string): Promise<SupabaseUploadResponse | undefined> {
        try {

            const uploadCommand = new PutObjectCommand({
                Bucket: bucketName,
                Key: key, 
                Body: file,
                ContentType: contentType
            })

            await this._client.send(uploadCommand)
        
            const publicEndpoint = this._endpoint.endsWith("/s3") ? 
                this._endpoint.substring(0, this._endpoint.length - 3)
                : this._endpoint

            return {
                bucket: bucketName,
                key: key,
                uri: `${publicEndpoint}/object/public/${bucketName}/${key}`
            }  
        } catch (error) {
            console.error("failed to upload file to supabase: ", error)
        }
    }

    async get(bucketName: string, key: string) {
        const getCommand = new GetObjectCommand({
            Bucket: bucketName,
            Key: key
        })
        const { Body } = await this._client.send(getCommand)
        if (!Body) {
            return null
        }

        return Body.transformToByteArray()
    }

    async delete(bucketName: string, key: string): Promise<void> {
        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key
        })

        await this._client.send(deleteCommand)
    }

}

export const supabaseStorageClient = new SupabaseStorageClient({
     forcePathStyle: true,
     region: process.env.S3_REGION || "",
     endpoint: `${process.env.S3_ENDPOINT}/s3` || "",
     credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ""
     }
})

export class LocalFileStoreClient implements IFileStoreClient {
    basePath: string

    constructor(basePath: string){
        this.basePath = basePath
    }

    async upload(bucketName: string, key: string, file: Uint8Array, contentType: string): Promise<UploadResponse | undefined> {
        try {
            const path = join(this.basePath, bucketName) 
            console.log(path)
            if (!existsSync(path)) {
                await mkdir(path, {recursive: true})
            }

            const filePath = join(path, key)
            await writeFile(filePath, file)
            return {
                bucket: bucketName,
                key: key,
                uri: filePath
            }
        } catch (error) {
            console.error(`failed to upload file: ${error}`)
        }
    }

    async get (bucketName: string, key: string): Promise<Uint8Array | null> {
        const filePath = join(this.basePath, bucketName, key)
        return readFile(filePath)
    }

    async delete(bucketName: string, key: string): Promise<void> {
        const filepath = join(this.basePath, bucketName, key)
        await unlink(filepath)
    }
    
}