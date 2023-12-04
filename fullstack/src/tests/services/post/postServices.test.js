const {USER_ID, mockOneUser, getPosts, newPost, updatePost, POST_ID} = require('./mock');

jest.mock('../../../modules/repositories', () => ({
  getUserRepositories: jest.fn(),
  getPostByUserIdRepositories: jest.fn(),
  createPostRepositories: jest.fn(),
  getPostByPostIdRepositories: jest.fn(),
  updatePostRepositories: jest.fn(),
  deletePostRepositories: jest.fn(),
}));

const {
  getUserRepositories,
  getPostByUserIdRepositories,
  createPostRepositories,
  getPostByPostIdRepositories,
  updatePostRepositories,
  deletePostRepositories,
} = require('../../../modules/repositories')
const {
  getPostByUserIdService,
  createPostService,
  updatePostService,
  deletePostService,
} = require('../../../modules/services');

describe('Testing Post Services', () => {
  describe('getPostByUserIdService', () => {
    it('should throw an error if author does not exists', async () => {
      getUserRepositories.mockReturnValueOnce([]);

      let error;

      try {
        await getPostByUserIdService({user_id: USER_ID});
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe('Missing author in database');
    });

    it('should return an empty array if there are no posts', async () => {
      getUserRepositories.mockReturnValueOnce(mockOneUser);
      getPostByUserIdRepositories.mockReturnValueOnce({posts: undefined});

      const result = await getPostByUserIdService({user_id: USER_ID});

      expect(result).toEqual({
        posts: []
      });
    });

    it('should return an array with posts', async () => {
      getUserRepositories.mockReturnValueOnce(mockOneUser);
      getPostByUserIdRepositories.mockReturnValueOnce(getPosts);

      const result = await getPostByUserIdService({user_id: USER_ID});

      expect(result).toEqual({
        posts: getPosts.posts
      });
    });
  });

  describe('createPostService', () => {
    it('should throw an error if author does not exists', async () => {
      getUserRepositories.mockReturnValueOnce([]);

      let error;

      try {
        await createPostService(newPost);
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe("Hasn't author in database");
    });

    it('should return an empty array if the post is not created', async () => {
      getUserRepositories.mockReturnValueOnce(mockOneUser);
      createPostRepositories.mockReturnValueOnce({post_created: undefined});

      const result = await createPostService(newPost);

      expect(result).toEqual({
        post_created_id: []
      })
    });

    it('Should return an array with the post created', async () => {
      getUserRepositories.mockReturnValueOnce(mockOneUser);
      createPostRepositories.mockReturnValueOnce({post_created: getPosts.posts});

      const result = await createPostService(newPost);

      expect(result).toEqual({
        post_created_id: getPosts.posts
      })
    });
  });

  describe('updatePostService', () => {
    it('should throw an error if post does not exist', async () => {
      getPostByPostIdRepositories.mockReturnValueOnce({posts: undefined});

      let error;

      try {
        await updatePostService(newPost);
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe("Hasn't post to update");
    });

    it('Succesfully updates a post', async () => {
      getPostByPostIdRepositories.mockReturnValueOnce(getPosts);
      updatePostRepositories.mockReturnValueOnce([]);

      const result = await updatePostService(updatePost);

      expect(result).toEqual({
        updatedpost: updatePost
      });
    });
  });

  describe('deletePostService', () => {
    it('should throw an error if post does not exist', async () => {
      getPostByPostIdRepositories.mockReturnValueOnce({posts: undefined});

      let error;

      try {
        await deletePostService({post_id: POST_ID});
      } catch (err) {
        error = err;
      }

      expect(error.message).toBe("Hasn't post to delete");
    });

    it('Succesfully updates a post', async () => {
      getPostByPostIdRepositories.mockReturnValueOnce(getPosts);
      deletePostRepositories.mockReturnValueOnce([]);

      const result = await deletePostService({post_id: POST_ID});

      expect(result).toEqual({
        deletedPost: updatePost
      });
    });
  });
});