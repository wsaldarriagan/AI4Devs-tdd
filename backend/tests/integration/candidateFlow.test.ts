import request from 'supertest';
import { app } from '../../src/index';
import { prismaMock } from '../setup';
import { mockCandidateData } from '../mocks/candidateData';

describe('Flujo de Candidatos', () => {
  it('debería crear un candidato completo con educación y experiencia', async () => {
    const expectedCandidate = { 
      id: 1, 
      ...mockCandidateData,
      educations: [{
        id: 1,
        ...mockCandidateData.educations[0],
        candidateId: 1
      }],
      workExperiences: [{
        id: 1,
        ...mockCandidateData.workExperiences[0],
        candidateId: 1
      }]
    };

    prismaMock.candidate.create.mockResolvedValue(expectedCandidate);

    const response = await request(app)
      .post('/candidates')
      .send(mockCandidateData)
      .expect(201);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.message).toBe('Candidate added successfully');
  });

  it('debería rechazar un candidato con datos inválidos', async () => {
    const invalidData = {
      ...mockCandidateData,
      email: 'correo-invalido'
    };

    const response = await request(app)
      .post('/candidates')
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('debería manejar errores de email duplicado', async () => {
    prismaMock.candidate.create.mockRejectedValue({
      code: 'P2002',
      message: 'Unique constraint failed on the fields: (`email`)'
    });

    const response = await request(app)
      .post('/candidates')
      .send(mockCandidateData)
      .expect(400);

    expect(response.body.error).toBe('The email already exists in the database');
  });
});
