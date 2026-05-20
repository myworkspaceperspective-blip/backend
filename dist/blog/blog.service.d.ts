import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
export declare class BlogService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBlogDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        imageUrl: string;
        videoUrl: string;
        author: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        imageUrl: string;
        videoUrl: string;
        author: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        imageUrl: string;
        videoUrl: string;
        author: string;
    }>;
    update(id: string, dto: UpdateBlogDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        imageUrl: string;
        videoUrl: string;
        author: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        title: string;
        imageUrl: string;
        videoUrl: string;
        author: string;
    }>;
}
