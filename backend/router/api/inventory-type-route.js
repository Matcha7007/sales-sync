import { 
    GetAll, GetById, Create, Update, Delete 
} from '../../app/controllers/api/inventory-type-controller.js'
import { auth } from '../../app/middleware/auth.js'


export const group = {
    prefix: '/inventory-type',
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

const InventoryTypeRoutes = { group, routes };
export default InventoryTypeRoutes;