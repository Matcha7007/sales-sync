import { login } from '../../app/controllers/api/auth-controller'

export const group = {
    prefix: '/auth'
}
export const routes = [
    {
        method: 'post',
        path: '/login',
        handler: login
    }
]