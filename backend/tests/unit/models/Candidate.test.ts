import { PrismaClient } from '@prisma/client';
import { Candidate } from '../../../src/domain/models/Candidate';
import { prismaMock } from '../../setup';

describe('Candidate Model', () => {
    const mockCandidateData = {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@test.com',
        phone: '666555444',
        address: 'Calle Test 123',
        education: [],
        workExperience: [],
        resumes: []
    };

    it('debería crear una instancia de Candidate correctamente', () => {
        const candidate = new Candidate(mockCandidateData);
        expect(candidate.firstName).toBe(mockCandidateData.firstName);
        expect(candidate.lastName).toBe(mockCandidateData.lastName);
        expect(candidate.email).toBe(mockCandidateData.email);
    });

    it('debería guardar un nuevo candidato correctamente', async () => {
        const candidate = new Candidate(mockCandidateData);
        
        prismaMock.candidate.create.mockResolvedValue({
            id: 1,
            ...mockCandidateData
        });

        const savedCandidate = await candidate.save();
        expect(savedCandidate).toHaveProperty('id', 1);
        expect(savedCandidate.firstName).toBe(mockCandidateData.firstName);
    });

    it('debería manejar errores de conexión a la base de datos', async () => {
        const candidate = new Candidate(mockCandidateData);
        
        prismaMock.candidate.create.mockRejectedValue(
            new Error('No se pudo conectar con la base de datos')
        );

        await expect(candidate.save()).rejects.toThrow(
            'No se pudo conectar con la base de datos'
        );
    });

    it('debería actualizar un candidato existente', async () => {
        const candidateWithId = {
            id: 1,
            ...mockCandidateData
        };

        const candidate = new Candidate(candidateWithId);
        
        prismaMock.candidate.update.mockResolvedValue({
            ...candidateWithId,
            firstName: 'Juan Actualizado'
        });

        const updatedCandidate = await candidate.save();
        expect(updatedCandidate.id).toBe(1);
        expect(updatedCandidate.firstName).toBe('Juan Actualizado');
    });
});
