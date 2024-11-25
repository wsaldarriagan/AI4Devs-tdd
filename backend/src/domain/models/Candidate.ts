import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class Candidate {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    education: any[];
    workExperience: any[];
    resumes: any[];

    constructor(data: any) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.phone = data.phone;
        this.address = data.address;
        this.education = data.education || [];
        this.workExperience = data.workExperience || [];
        this.resumes = data.resumes || [];
    }

    async save() {
        const candidateData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phone: this.phone,
            address: this.address
        };

        try {
            if (this.id) {
                return await prisma.candidate.update({
                    where: { id: this.id },
                    data: candidateData
                });
            } else {
                return await prisma.candidate.create({
                    data: candidateData
                });
            }
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new Error('The email already exists in the database');
            }
            throw error;
        }
    }
}

