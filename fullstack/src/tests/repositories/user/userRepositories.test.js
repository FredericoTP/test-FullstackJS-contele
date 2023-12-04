const { USER_ID, mockGetUser, mockGetUsers, new_user } = require('./mock');

jest.mock('../../../modules/common/handlers', () => ({
  client: jest.fn(),
  getTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  rollbackTransaction: jest.fn(),
}));

const { 
  client, 
  getTransaction, 
  commitTransaction,
} = require('../../../modules/common/handlers');
const { 
  getUserRepositories, 
  getUsersRepositories,
  createUserRepositories,
  updateUserRepositories,
  deleteUserRepositories,
} = require('../../../modules/repositories');

describe('Testing User Repositories', () => {
  beforeEach(() => {
    commitTransaction.mockClear();
  });

  describe('getUserRepositories', () => {
    it('should return an empty array when no parameter is passed in', async () => {
      client.mockImplementationOnce(() => ({
        where: jest.fn().mockReturnValue([]),
      }));

      const result = await getUserRepositories();

      expect(result).toEqual({
        users: [],
      });
    });

    it('should return an empty array when user does not exist', async () => {
      client.mockImplementationOnce(() => ({
        where: jest.fn().mockReturnValue([]),
      }));

      const result = await getUserRepositories({ USER_ID });

      expect(result).toEqual({
        users: [],
      });
    });

    it('should return an array with the user if it exists', async () => {
      client.mockImplementationOnce(() => ({
        where: jest.fn().mockReturnValue(mockGetUser),
      }));

      const result = await getUserRepositories({ USER_ID });

      expect(result).toEqual({
        users: mockGetUser,
      });
    });
  });

  describe('getUsersRepositories', () => {
    it('should return an empty array when user does not exist', async () => {
      client.mockReturnValueOnce([]);

      const result = await getUsersRepositories();

      expect(result).toEqual({
        users: [],
      });
    });

    it('should return an array with the user if it exists', async () => {
      client.mockReturnValueOnce(mockGetUsers);

      const result = await getUsersRepositories();

      expect(result).toEqual({
        users: mockGetUsers,
      });
    });
  });

  describe('createUsersRepositories', () => {
    it('should handle error during user creation', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          insert: jest.fn().mockImplementationOnce(() => {
            throw new Error('Error');
          }),
        }))
      }))

      let error;

      try {
        await createUserRepositories({ new_user });
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe('Error: Error');
    });

    it('should return an empty array when no parameter is passed in', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          insert: jest.fn().mockReturnValueOnce([]),
        }))
      }))

      const result = await createUserRepositories();

      expect(result).toEqual({
        user_created: []
      });
    });

    it('should return an empty array when user is not created', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          insert: jest.fn().mockReturnValueOnce([]),
        }))
      }))

      const result = await createUserRepositories({ new_user });

      expect(result).toEqual({
        user_created: []
      });
    });

    it('should return an array with the user if created', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          insert: jest.fn().mockReturnValueOnce(mockGetUser),
        }))
      }))

      const result = await createUserRepositories({ new_user });

      expect(result).toEqual({
        user_created: mockGetUser,
      });
      expect(commitTransaction).toBeCalledTimes(1);
    });
  });

  describe('updateUserRepositories', () => {
    it('should handle error during user update', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          where: jest.fn().mockImplementationOnce(() => ({
            update: jest.fn().mockImplementationOnce(() => {
              throw new Error('Error');
            }),
          }))
        }))
      }))

      let error;

      try {
        await updateUserRepositories(mockGetUser);
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe('Error: Error');
    });

    it('should update succesfully an user', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          where: jest.fn().mockImplementationOnce(() => ({
            update: jest.fn().mockReturnValueOnce(),
          }))
        }))
      }))

      const result = await updateUserRepositories(mockGetUser);

      expect(commitTransaction).toBeCalledTimes(1);
    });
  });

  describe('deleteUserRepositories', () => {
    it('should handle error during user delete', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          where: jest.fn().mockImplementationOnce(() => ({
            del: jest.fn().mockImplementationOnce(() => {
              throw new Error('Error');
            }),
          }))
        }))
      }))

      let error;

      try {
        await deleteUserRepositories({ USER_ID });
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe('Error: Error');
    });

    it('should delete succesfully an user', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          where: jest.fn().mockImplementationOnce(() => ({
            del: jest.fn().mockReturnValueOnce(),
          }))
        }))
      }))

      const result = await deleteUserRepositories({ USER_ID });

      expect(commitTransaction).toBeCalledTimes(1);
    });
  });
});