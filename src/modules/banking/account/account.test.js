// tests/account.test.js
const db = require('../db');
const { createAccount, getAccounts, deleteAccount } = require('../banking/account');

// Mock de la base de données
jest.mock('../db');

describe('Account Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAccount', () => {
    test('réussit avec des paramètres valides', async () => {
      const mockAccount = { userId: 1, type: 'CHECKING', balance: 1000 };
      const mockResult = { rows: [{ id: 42, ...mockAccount }] };

      db.query.mockResolvedValue(mockResult);

      const result = await createAccount(mockAccount);
      expect(result).toEqual(expect.objectContaining({ id: 42, userId: 1 }));
      expect(db.query).toHaveBeenCalledTimes(1);
    });

    test('échoue avec des paramètres invalides', async () => {
      await expect(createAccount({ userId: null, type: '', balance: -100 }))
        .rejects
        .toThrow('Invalid account parameters');
    });
  });

  describe('getAccounts', () => {
    test('retourne la liste des comptes', async () => {
      const mockAccounts = [
        { id: 1, userId: 1, type: 'CHECKING', balance: 1000 },
        { id: 2, userId: 1, type: 'SAVINGS', balance: 5000 }
      ];
      db.query.mockResolvedValue({ rows: mockAccounts });

      const result = await getAccounts(1);
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('type', 'CHECKING');
      expect(db.query).toHaveBeenCalledWith(expect.stringContaining('SELECT'), [1]);
    });
  });

  describe('deleteAccount', () => {
    test('réussit avec un ID valide', async () => {
      db.query.mockResolvedValue({ rowCount: 1 });

      const result = await deleteAccount(1, 2);
      expect(result).toBe(true);
    });

    test('échoue avec un mauvais ID', async () => {
      db.query.mockResolvedValue({ rowCount: 0 });

      const result = await deleteAccount(1, 999);
      expect(result).toBe(false);
    });
  });
});
