const allUserPosts = {
  posts: [{
    id: 1,
    author_id: 1,
    post_text: 'Teste'
  }, {
    id: 2,
    author_id: 1,
    post_text: 'Teste 2'
  }]
};

const newPost = {
  author_id: 1,
  post_text: 'Teste'
}

const createdPost = {
  post_created_id: [1]
}

const updatedPost = {
  updatedpost: {
    id: 1,
    author_id: 1,
    post_text: 'Teste'
  }
}

const deletedPost = {
  deletedPost: {
    id: 1,
    author_id: 1,
    post_text: 'Teste'
  }
}

module.exports = {
  allUserPosts,
  newPost,
  createdPost,
  updatedPost,
  deletedPost,
}