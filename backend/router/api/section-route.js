import { GetAll, GetById, Create, Update, Delete } from '../../app/controllers/api/section-controller.js'
import { auth } from '../../app/middleware/auth.js'
import { logMiddleware } from '../../app/middleware/logaktivitas.js'


export const group = {
    prefix: '/section',
    // middleware: [auth, logMiddleware]
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

const SectionRoutes = { group, routes };
export default SectionRoutes;