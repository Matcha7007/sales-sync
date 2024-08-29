import { 
    GetAll, GetById, Create, Update, Delete 
} from '../../app/controllers/api/category-controller.js'
import { auth } from '../../app/middleware/auth.js'


export const group = {
    prefix: '/category',
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

const CategoryRoutes = { group, routes };
export default CategoryRoutes;