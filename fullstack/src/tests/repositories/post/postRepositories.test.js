const { POST_ID, mockGetPost, USER_ID, mockGetPosts, newPost } = require('./mock');

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
  rollbackTransaction, 
} = require('../../../modules/common/handlers');
const { 
  getPostByPostIdRepositories, 
  getPostByUserIdRepositories,
  createPostRepositories,
  updatePostRepositories,
  deletePostRepositories,
} = require('../../../modules/repositories');

describe('Testing Post Repositories', () => {
  beforeEach(() => {
    commitTransaction.mockClear();
  });

  describe('getPostByPostIdRepositories', () => {
    it('should return an empty array when post does not exist', async () => {
      client.mockImplementationOnce(() => ({
        where: jest.fn().mockReturnValue([]),
      }));

      const result = await getPostByPostIdRepositories({ POST_ID });

      expect(result).toEqual({
        posts: [],
      });
    });

    it('should return an empty array when no parameter is passed in', async () => {
      client.mockImplementationOnce(() => ({
        where: jest.fn().mockReturnValue([]),
      }));

      const result = await getPostByPostIdRepositories();

      expect(result).toEqual({
        posts: [],
      });
    });

    it('should return an array with the post if it exists', async () => {
      client.mockImplementationOnce(() => ({
        where: jest.fn().mockReturnValue(mockGetPost),
      }));

      const result = await getPostByPostIdRepositories({ POST_ID });

      expect(result).toEqual({
        posts: mockGetPost,
      });
    });
  });

  describe('getPostByUserIdRepositories', () => {
    it('should return an empty array when post does not exist', async () => {
      client.mockImplementationOnce(() => ({
        where: jest.fn().mockReturnValue([]),
      }));

      const result = await getPostByUserIdRepositories({ USER_ID });

      expect(result).toEqual({
        posts: [],
      });
    });

    it('should return an empty array when no parameter is passed in', async () => {
      client.mockImplementationOnce(() => ({
        where: jest.fn().mockReturnValue([]),
      }));
    
      const result = await getPostByUserIdRepositories();
    
      expect(result).toEqual({
        posts: [],
      });
    });

    it('should return an array with posts if it exists', async () => {
      client.mockImplementationOnce(() => ({
        where: jest.fn().mockReturnValue(mockGetPosts),
      }));

      const result = await getPostByUserIdRepositories({ USER_ID });

      expect(result).toEqual({
        posts: mockGetPosts,
      });
    });
  });

  describe('createPostRepositories', () => {
    it('should handle error during post creation', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          insert: jest.fn().mockImplementationOnce(() => {
            throw new Error('Error');
          }),
        }))
      }))

      let error;

      try {
        await createPostRepositories({ newPost });
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

      const result = await createPostRepositories();

      expect(result).toEqual({
        post_created: []
      });
    });

    it('should return an empty array when post is not created', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          insert: jest.fn().mockReturnValueOnce([]),
        }))
      }))

      const result = await createPostRepositories({ newPost });

      expect(result).toEqual({
        post_created: []
      });
    });

    it('should return an array with post if created', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          insert: jest.fn().mockReturnValueOnce(mockGetPost),
        }))
      }))

      const result = await createPostRepositories({ newPost });

      expect(result).toEqual({
        post_created: mockGetPost,
      });
      expect(commitTransaction).toBeCalledTimes(1);
    });
  });

  describe('updatePostRepositories', () => {
    it('should handle error during post update', async () => {
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
        await updatePostRepositories(mockGetPost);
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe('Error: Error');
    });

    it('should update succesfully a post', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          where: jest.fn().mockImplementationOnce(() => ({
            update: jest.fn().mockReturnValueOnce(),
          }))
        }))
      }))

      const result = await updatePostRepositories(mockGetPost);

      expect(commitTransaction).toBeCalledTimes(1);
    });
  });

  describe('deletePostRepositories', () => {
    it('should handle error during post delete', async () => {
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
        await deletePostRepositories({ POST_ID });
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe('Error: Error');
    });

    it('should delete succesfully a post', async () => {
      getTransaction.mockImplementationOnce(() => ({
        transaction: jest.fn().mockImplementationOnce(() => ({
          where: jest.fn().mockImplementationOnce(() => ({
            del: jest.fn().mockReturnValueOnce(),
          }))
        }))
      }))

      const result = await deletePostRepositories({ POST_ID });

      expect(commitTransaction).toBeCalledTimes(1);
    });
  });
});