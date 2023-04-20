// ----------------------------------------------------------------------

let account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
};

export function updateAccountData(data) {
  account = {...account, ...data};
}

export default account;
