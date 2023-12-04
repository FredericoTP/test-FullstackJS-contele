const allUsers = {
  users: [{
    id: 1, 
    full_name: 'Teste', 
    user_email: 'test@test.com', 
    user_password: '123456'
  }, {
    id: 2, 
    full_name: 'Teste 2', 
    user_email: 'test2@test.com', 
    user_password: '654321'
  }],
  has_multiple_user: true,
};

const oneUser = {
  user: [{
    id: 1, 
    full_name: 'Teste', 
    user_email: 'test@test.com', 
    user_password: '123456'
  }],
  has_single_user: true,
};

const newUser = {
  full_name: 'Teste', 
  user_email: 'test@test.com', 
  user_password: '123456'
};

const createdUser = {
  user_created_id: [1]
};

const updatedUser = {
  updatedUser: [{
    id: 1,
    full_name: 'Teste', 
    user_email: 'test@test.com', 
    user_password: '123456'
  }]
};

const deletedUser = {
  deletedUser: [{
    id: 1,
    full_name: 'Teste', 
    user_email: 'test@test.com', 
    user_password: '123456'
  }]
};

module.exports = {
  allUsers,
  oneUser,
  newUser,
  createdUser,
  updatedUser,
  deletedUser,
}