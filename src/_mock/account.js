
let account = {
  displayName: 'John Doe',
  email: 'john_doe@gmail.com',
};

export function updateAccountData(data) {
  account = {...account, ...data};
}

export default account;
