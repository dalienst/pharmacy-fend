const publicLinks = {
  Home: '/',
  Login: '/login',
  Registration: '/register',
};

const privateLinks = {
  Profile: '/profile',
  Update_profile: '/update-profile',
  Dashboard: '/dashboard',
  Products: '/products',
  ProductDetail: '/products/:id/detail',
  Distros: '/distributors',
  Orders: '/orders'
};

const urls = {
    REGISTER: "pharmacy/register/",
    LOGIN: "pharmacy/login/",
    REFRESH: "pharmacy/login/refresh/",
    PROFILE: "pharmacy/employee/",
    PRODUCTS: "inventory/product/",
    DISTROS: "pharmacy/distributor/",
    ORDERS: "inventory/order/"
};

export {urls, publicLinks, privateLinks}; 