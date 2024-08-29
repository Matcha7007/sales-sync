import { GetAll, GetListEmployeeWithRoleUser, GetByNsk, GetById, Create, Update, Delete } from '../../app/controllers/api/employee-controller'
import { auth } from '../../app/middleware/auth'


export const group = {
    prefix: '/employee',
    //middleware: [auth]
}
export const routes = [
    {
        method: 'get',
        path: '/',
        handler: GetAll
    }, {
        method: 'get',
        path: '/getoperator',
        handler: GetListEmployeeWithRoleUser
    },
    {
        method: 'get',
        path: '/bynsk/:nsk',
        handler: GetByNsk
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