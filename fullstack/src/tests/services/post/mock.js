const USER_ID = 1;

const POST_ID = 1;

const mockOneUser = {
  users: [{
    id: 1, 
    full_name: 'Teste', 
    user_email: 'test@test.com', 
    user_password: '123456'
  }]
};

const getPosts = {
  posts: [{
    id: 1,
    author_id: 1,
    post_text: 'Teste'
  }]
};

const newPost = {
  author_id: 1,
  post_text: 'teste'
};

const updatePost = {
  id: 1,
  author_id: 1,
  post_text: 'Teste'
}

module.exports = {
  USER_ID,
  POST_ID,
  mockOneUser,
  getPosts,
  newPost,
  updatePost,
}