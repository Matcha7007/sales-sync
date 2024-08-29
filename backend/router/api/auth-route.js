import { login } from '../../app/controllers/api/auth-controller.js';

export const group = {
    prefix: '/auth'
};

export const routes = [
    {
        method: 'post',
        path: '/login',
        handler: login
    }
];

const AuthRoutes = { group, routes };
export default AuthRoutes;
