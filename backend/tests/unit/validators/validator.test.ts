import { validateCandidateData } from '../../../src/application/validator';

describe('Validator', () => {
  const validCandidate = {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@example.com',
    phone: '666555444',
    address: 'Calle Principal 123',
    educations: [{
      institution: 'Universidad',
      title: 'Ingeniería',
      startDate: '2020-01-01',
      endDate: '2024-01-01'
    }],
    workExperiences: [{
      company: 'Empresa',
      position: 'Desarrollador',
      description: 'Desarrollo de software',
      startDate: '2024-01-01',
      endDate: '2024-03-01'
    }]
  };

  it('debería validar un candidato con datos correctos', () => {
    expect(() => validateCandidateData(validCandidate)).not.toThrow();
  });

  it('debería fallar con un nombre inválido', () => {
    const invalidCandidate = {
      ...validCandidate,
      firstName: '123'
    };
    expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid name');
  });

  it('debería fallar con un email inválido', () => {
    const invalidCandidate = {
      ...validCandidate,
      email: 'correo-invalido'
    };
    expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid email');
  });

  it('debería fallar con un teléfono inválido', () => {
    const invalidCandidate = {
      ...validCandidate,
      phone: '123'
    };
    expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid phone');
  });

  it('debería fallar con una fecha de educación inválida', () => {
    const invalidCandidate = {
      ...validCandidate,
      educations: [{
        ...validCandidate.educations[0],
        startDate: 'fecha-invalida'
      }]
    };
    expect(() => validateCandidateData(invalidCandidate)).toThrow('Invalid date');
  });
});
