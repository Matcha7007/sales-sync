import { GetAll, Create, Update, Delete } from '../../app/controllers/api/department-controller'
import { auth } from '../../app/middleware/auth'
import { logMiddleware } from '../../app/middleware/logaktivitas'


export const group = {
    prefix: '/department',
    middleware: [auth, logMiddleware]
}
export const routes = [
    {
        method: 'get',
        path: '/',
        handler: GetAll
    },
    {
        method: 'post',
        path: '/create/',
        handler: Create,
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