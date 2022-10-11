// LocalStorageService.js
const LocalStorageService = (() => {
  let service;
  const getService = () => {
    if (!service) {
      service = this;
      return service;
    }
    return service;
  };
  const setToken = (tokenObj) => {
    localStorage.setItem('access', tokenObj?.access);
    localStorage.setItem('refresh', tokenObj?.refresh);
  };
  const getAccessToken = () => {
    return localStorage.getItem('access');
  };
  const getRefreshToken = () => {
    return localStorage.getItem('refresh');
  };
  const clearToken = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  };
  return {
    getService,
    setToken,
    getAccessToken,
    getRefreshToken,
    clearToken
  };
})();
export default LocalStorageService;
