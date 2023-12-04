const httpStatusCodes = require('http-status-codes');
const { allUserPosts, newPost, createdPost, updatedPost, deletedPost } = require('./mock');

jest.mock('../../../modules/services', () => ({
  getPostByUserIdService: jest.fn(),
  createPostService: jest.fn(),
  updatePostService: jest.fn(),
  deletePostService: jest.fn(),
}));
jest.mock('../../../modules/common/handlers', () => ({
  httpErrorHandler: jest.fn(),
}));

const {
  getPostByUserIdService,
  createPostService,
  updatePostService,
  deletePostService,
} = require('../../../modules/services');
const {
  listPostHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
} = require('../../../modules/handlers');
const {
  httpErrorHandler,
} = require('../../../modules/common/handlers');

describe('Testing Post Handlers', () => {
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

  describe('listPostHandler', () => {
    it('should handle an Error with httpErrorhandler', async () => {
      req.query = {user_id: 1};
      const error = new Error('Error');
      getPostByUserIdService.mockRejectedValueOnce(error);

      await listPostHandler(req, res, next);

      expect(httpErrorHandler).toHaveBeenCalledWith({req, res, error});
    });

    it('succesfully list an user posts', async () => {
      req.query = {user_id: 1};
      getPostByUserIdService.mockReturnValue(allUserPosts);

      await listPostHandler(req, res, next);

      expect(res.status).toHaveBeenCalledWith(httpStatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith(allUserPosts);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('createPostHandler', () => {
    it('should handle an Error with httpErrorhandler', async () => {
      req.body = newPost;
      const error = new Error('Error');
      createPostService.mockRejectedValueOnce(error);

      await createPostHandler(req, res, next);

      expect(httpErrorHandler).toHaveBeenCalledWith({req, res, error});
    });

    it('succesfully creates an user post', async () => {
      req.body = newPost;
      createPostService.mockReturnValue(createdPost);

      await createPostHandler(req, res, next);

      expect(res.status).toHaveBeenCalledWith(httpStatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith(createdPost);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('updatePostHandler', () => {
    it('should handle an Error with httpErrorhandler', async () => {
      req.body = {id: 1, ...newPost};
      const error = new Error('Error');
      updatePostService.mockRejectedValueOnce(error);

      await updatePostHandler(req, res, next);

      expect(httpErrorHandler).toHaveBeenCalledWith({req, res, error});
    });

    it('succesfully updates an user post', async () => {
      req.body = {id: 1, ...newPost};
      updatePostService.mockReturnValue(updatedPost);

      await updatePostHandler(req, res, next);

      expect(res.status).toHaveBeenCalledWith(httpStatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith(updatedPost);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('deletePostHandler', () => {
    it('should handle an Error with httpErrorhandler', async () => {
      req.query = {user_id: 1};
      const error = new Error('Error');
      deletePostService.mockRejectedValueOnce(error);

      await deletePostHandler(req, res, next);

      expect(httpErrorHandler).toHaveBeenCalledWith({req, res, error});
    });

    it('succesfully deletes an user post', async () => {
      req.query = {user_id: 1};
      deletePostService.mockReturnValue(deletedPost);

      await deletePostHandler(req, res, next);

      expect(res.status).toHaveBeenCalledWith(httpStatusCodes.OK);
      expect(res.send).toHaveBeenCalledWith(deletedPost);
      expect(next).not.toHaveBeenCalled();
    });
  });
});