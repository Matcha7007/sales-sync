import { GetAll, GetById, Create, Update, Delete } from '../../app/controllers/api/role-controller'
import { auth } from '../../app/middleware/auth'

export const group = {
    prefix: '/role',
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
]