import { GetAll, GetById, Create, Update, Delete, UpdatePassword } from '../../app/controllers/api/user-controller.js'
import { auth } from '../../app/middleware/auth.js'


export const group = {
    prefix: '/user',
    //middleware: [auth]
}
export const routes = [
    {
        method: 'get',
        path: '/',
        handler: GetAll
    },
    {
        method: 'get',
        path: '/:uuid',
        handler: GetById
    },
    {
        method: 'post',
        path: '/create/',
        handler: Create
    },
    {
        method: 'put',
        path: '/update/:uuid',
        handler: Update
    },
    {
        method: 'delete',
        path: '/delete/:uuid',
        handler: Delete
    },
    {
        method: 'post',
        path: '/change/',
        handler: UpdatePassword
    }
]

const UserRoutes = { group, routes };
export default UserRoutes;