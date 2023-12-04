const { mockAllUsers, USER_ID, mockOneUser, newUser, updateUser } = require('./mock');
const bcrypt = require('bcryptjs');

jest.mock('../../../modules/repositories', () => ({
  getUsersRepositories: jest.fn(),
  getUserRepositories: jest.fn(),
  createUserRepositories: jest.fn(),
  updateUserRepositories: jest.fn(),
  deleteUserRepositories: jest.fn(),
}));

const {
  getUsersRepositories,
  getUserRepositories,
  createUserRepositories,
  updateUserRepositories,
  deleteUserRepositories,
} = require('../../../modules/repositories')
const {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} = require('../../../modules/services');

describe('Testing User Services', () => {
  beforeEach(() => {
    getUsersRepositories.mockClear();
    getUserRepositories.mockClear();
  });

  describe('getAllUsersService', () => {
    it('should return an empty array', async () => {
      getUsersRepositories.mockReturnValueOnce([])

      const result = await getAllUsersService();

      expect(result).toEqual({
        users: [],
        has_multiple_user: false
      })
    });

    it('should return an array with all users', async () => {
      getUsersRepositories.mockReturnValueOnce(mockAllUsers)

      const result = await getAllUsersService();

      expect(result).toEqual({
        users: mockAllUsers.users,
        has_multiple_user: true
      })
    });
  });

  describe('getUserByIdService', () => {
    it('should return false if no user_id is passed in', async () => {
      const result = await getUserByIdService({});

      expect(result).toEqual({
        user: false,
        has_single_user: false,
      })
    });

    it('should return an empty array', async () => {
      getUserRepositories.mockReturnValueOnce([])

      const result = await getUserByIdService({ user_id: USER_ID });

      expect(result).toEqual({
        user: [],
        has_single_user: false
      })
    });

    it('should return an array with one user', async () => {
      getUserRepositories.mockReturnValueOnce(mockOneUser)

      const result = await getUserByIdService({ user_id: USER_ID });

      expect(result).toEqual({
        user: mockOneUser.users,
        has_single_user: true
      })
    });
  });

  describe('createUserService', () => {
    it('should return an empty array if the user is not created', async () => {
      bcrypt.hashSync = jest.fn().mockReturnValueOnce('');
      createUserRepositories.mockReturnValueOnce([]);

      const result = await createUserService(newUser);

      expect(result).toEqual({
        user_created_id: []
      });
    });

    it('should return an array with the id when user is created', async () => {
      bcrypt.hashSync = jest.fn().mockReturnValueOnce('');
      createUserRepositories.mockReturnValueOnce({user_created: [1]});

      const result = await createUserService(newUser);

      expect(result).toEqual({
        user_created_id: [1]
      });
    });
  });

  describe('updateUserService', () => {
    it('should throw an error if getUserRepositories fails', async () => {
      getUserRepositories.mockReturnValueOnce({users: undefined});

      let error;

      try {
        await updateUserService(updateUser);
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe('Missing user to update');
    });

    it('should throw an error if user dows not exist', async () => {
      getUserRepositories.mockReturnValueOnce({users: []});

      let error;

      try {
        await updateUserService(updateUser);
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe('Missing user to update');
    });

    it('should return the user updated', async () => {
      getUserRepositories.mockReturnValueOnce(mockOneUser);
      bcrypt.hashSync = jest.fn().mockReturnValueOnce('abc');
      updateUserRepositories.mockReturnValueOnce([])

      const result = await updateUserService(updateUser);

      expect(result).toEqual({
        updatedUser: {
          ...updateUser,
          user_password: 'abc',
        }
      })
    });
  });

  describe('deleteUserService', () => {
    it('should throw an error if getUserRepositories fails', async () => {
      getUserRepositories.mockReturnValueOnce({users: undefined});

      let error;

      try {
        await deleteUserService({user_id: USER_ID});
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe('No user to delete');
    });

    it('should throw an error if user dows not exist', async () => {
      getUserRepositories.mockReturnValueOnce({users: []});

      let error;

      try {
        await deleteUserService({user_id: USER_ID});
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe('No user to delete');
    });

    it('should return the user deleted', async () => {
      getUserRepositories.mockReturnValueOnce(mockOneUser);
      deleteUserRepositories.mockReturnValueOnce([])

      const result = await deleteUserService(updateUser);

      expect(result).toEqual({
        deletedUser: {
          ...mockOneUser.users[0],
        }
      })
    });
  });
});