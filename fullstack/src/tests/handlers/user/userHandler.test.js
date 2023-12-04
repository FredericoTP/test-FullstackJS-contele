const httpStatusCodes = require('http-status-codes');
const { allUsers, oneUser, newUser, createdUser, updatedUser, deletedUser } = require('./mock');

jest.mock('../../../modules/services', () => ({
  getUserByIdService: jest.fn(),
  getAllUsersService: jest.fn(),
  createUserService: jest.fn(),
  updateUserService: jest.fn(),
  deleteUserService: jest.fn(),
}));
jest.mock('../../../modules/common/handlers', () => ({
  httpErrorHandler: jest.fn(),
}));

const {
  getUserByIdService,
  getAllUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
} = require('../../../modules/services');
const {
  listUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require('../../../modules/handlers');
const {
  httpErrorHandler,
} = require('../../../modules/common/handlers');

describe('Testing User Handlers', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      query: {},
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('listUserHandler', () => {
    it('should return the list of users if there is no query', async () => {
      getAllUsersService.mockReturnValue(allUsers);

      await listUserHandler(req, res, next);

      expect(res.status).toHaveBeenCalledWith(httpStatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith({ users: allUsers.users });
      expect(next).not.toHaveBeenCalled();
    });

    it('should return the user if there is a query', async () => {
      req.query = {
        user_id: 1
      }
      getUserByIdService.mockReturnValue(oneUser);

      await listUserHandler(req, res, next);

      expect(res.status).toHaveBeenCalledWith(httpStatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith({ users: oneUser.user });
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle an Error with httpErrorhandler', async () => {
      const error = new Error('Error');
      getAllUsersService.mockRejectedValueOnce(error);

      await listUserHandler(req, res, next);

      expect(httpErrorHandler).toHaveBeenCalledWith({req, res, error});
    });
  });

  describe('createUserHandler', () => {
    it('should handle an Error with httpErrorhandler', async () => {
      req.body = newUser;
      const error = new Error('Error');
      createUserService.mockRejectedValueOnce(error);

      await createUserHandler(req, res, next);

      expect(httpErrorHandler).toHaveBeenCalledWith({req, res, error});
    });

    it('succesfully creates a new user', async () => {
      req.body = newUser;
      createUserService.mockReturnValue(createdUser);

      await createUserHandler(req, res, next);

      expect(res.status).toHaveBeenCalledWith(httpStatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith(createdUser);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('updateUserHandler', () => {
    it('should handle an Error with httpErrorhandler', async () => {
      req.body = {id: 1, ...newUser};
      const error = new Error('Error');
      updateUserService.mockRejectedValueOnce(error);

      await updateUserHandler(req, res, next);

      expect(httpErrorHandler).toHaveBeenCalledWith({req, res, error});
    });

    it('succesfully updates an user', async () => {
      req.body = {id: 1, ...newUser};
      updateUserService.mockReturnValue(updatedUser);

      await updateUserHandler(req, res, next);

      expect(res.status).toHaveBeenCalledWith(httpStatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith(updatedUser);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('deleteUserHandler', () => {
    it('should handle an Error with httpErrorhandler', async () => {
      req.query = {user_id: 1};
      const error = new Error('Error');
      deleteUserService.mockRejectedValueOnce(error);

      await deleteUserHandler(req, res, next);

      expect(httpErrorHandler).toHaveBeenCalledWith({req, res, error});
    });

    it('succesfully deletes an user', async () => {
      req.query = {user_id: 1};
      deleteUserService.mockReturnValue(deletedUser);

      await deleteUserHandler(req, res, next);

      expect(res.status).toHaveBeenCalledWith(httpStatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith(deletedUser);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
