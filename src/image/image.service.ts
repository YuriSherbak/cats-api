import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EntityRepository, Repository} from "typeorm";
import {Image} from "./image.entity";
import {S3} from "aws-sdk";
import {v4 as uuid} from 'uuid';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {}

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private imageRepository: Repository<Image>,
    ) {}

    async uploadPublicFile(dataBuffer: Buffer, filename: string): Promise<Image> {
        const s3 = new S3();
        const uploadResult = await s3.upload({
            Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
            Body: dataBuffer,
            Key: `${uuid()}-${filename}`
        }).promise();

        const newFile = this.imageRepository.create({
            key: uploadResult.Key,
            url: uploadResult.Location
        });
7
        return await this.imageRepository.save(newFile);
    }
}