import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

export const prismaMock = mockDeep<PrismaClient>();

// Mock global PrismaClient
jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => prismaMock)
}));

beforeEach(() => {
    jest.clearAllMocks();
});
