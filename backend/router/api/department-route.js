import { GetAll, Create, Update, Delete } from '../../app/controllers/api/department-controller.js'
import { auth } from '../../app/middleware/auth.js'
import { logMiddleware } from '../../app/middleware/logaktivitas.js'


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

const DepartmentRoutes = { group, routes };
export default DepartmentRoutes;