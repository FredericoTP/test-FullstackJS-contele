const POST_ID = 1;
const USER_ID = 1;

const mockGetPost = [{
  id: 1,
  author_id: 1,
  post_text: 'Teste'
}];

const mockGetPosts = [{
  id: 1,
  author_id: 1,
  post_text: 'Teste'
}, {
  id: 2,
  author_id: 1,
  post_text: 'Teste 2'
}];

const newPost = {
  author_id: 2,
  post_text: 'Teste'
}

module.exports = {
  POST_ID,
  USER_ID,
  mockGetPost,
  mockGetPosts,
  newPost,
}