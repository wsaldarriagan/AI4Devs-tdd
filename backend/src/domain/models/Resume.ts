import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Resume {
    id?: number;
    candidateId?: number;
    filePath: string;
    fileType: string;
    uploadDate: Date;

    constructor(data: any) {
        this.id = data.id;
        this.candidateId = data.candidateId;
        this.filePath = data.filePath;
        this.fileType = data.fileType;
        this.uploadDate = new Date();
    }

    async save() {
        if (!this.candidateId) {
            throw new Error('candidateId is required for saving');
        }

        const resumeData = {
            candidateId: this.candidateId,
            filePath: this.filePath,
            fileType: this.fileType,
            uploadDate: this.uploadDate
        };

        try {
            if (this.id) {
                return await prisma.resume.update({
                    where: { id: this.id },
                    data: resumeData
                });
            } else {
                return await prisma.resume.create({
                    data: resumeData
                });
            }
        } catch (error) {
            console.error('Error saving resume:', error);
            throw new Error('Error saving resume');
        }
    }
}