const USER_ID = 1;

const mockAllUsers = {
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
  }]
};

const mockOneUser = {
  users: [{
    id: 1, 
    full_name: 'Teste', 
    user_email: 'test@test.com', 
    user_password: '123456'
  }]
};

const newUser = {
  full_name: 'Teste', 
  user_email: 'test@test.com', 
  user_password: '123456'
}

const updateUser = {
  id: 1, 
  full_name: 'Teste', 
  user_email: 'test@test.com', 
  user_password: '123456'
}

module.exports = {
  USER_ID,
  mockAllUsers,
  mockOneUser,
  newUser,
  updateUser,
}