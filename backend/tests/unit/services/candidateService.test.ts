import { addCandidate } from '../../../src/application/services/candidateService';
import { prismaMock } from '../../setup';
import { mockCandidateData } from '../../mocks/candidateData';

describe('CandidateService', () => {
  it('debería crear un candidato exitosamente', async () => {
    const expectedCandidate = { id: 1, ...mockCandidateData };
    prismaMock.candidate.create.mockResolvedValue(expectedCandidate);

    const result = await addCandidate(mockCandidateData);

    expect(result).toHaveProperty('id', 1);
    expect(result.firstName).toBe(mockCandidateData.firstName);
  });

  it('debería manejar errores de validación', async () => {
    const invalidData = { ...mockCandidateData, email: 'invalid-email' };
    
    await expect(addCandidate(invalidData))
      .rejects
      .toThrow();
  });
});