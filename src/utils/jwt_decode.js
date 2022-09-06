import jwt_decode from 'jwt-decode';

const jwtDecode = (token) => {
  const decoded = jwt_decode(token);
  return decoded.user_id;
};

export default jwtDecode;
