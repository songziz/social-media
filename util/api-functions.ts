export const getUserInfo = (uid: string) => {
  const val = 0;
};


const fetchOptions = (method: string, idToken :string) => (
  {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
    },
  }
);