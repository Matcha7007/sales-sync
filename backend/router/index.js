import { Router as _Router, json } from 'express'
import apiRoutes from './api/index.js'

class Router {

    constructor() {
        this.router = _Router()
        this.apiRoutes = apiRoutes
    }

    create(app) {
        // TODO attach middleware
        this._attachMiddleware()

        // TODO attach routes
        //this._attachWebRoutes()
        this._attachApiRoutes()

        // TODO handle 404 pages
        this._handlePageNotFound()

        // TODO handle exceptions
        this._handleExceptions()

        // TODO register router

        app.get('/', function (req, res) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
            res.header('X-Frame-Options', 'SAMEORIGIN');
            res.removeHeader("X-Powered-By");
            res.send(`WELCOME TO SUMITOMO-WIP-BE`);
        });

        app.use(this.router)
    }

    _handleExceptions() {
        this.router.use((err, req, res, next) => {
            err.statusCode = err.status || err.statusCode || 500

            return res.status(err.statusCode).send(err.message)
        })
    }

    _catchError(route) {
        return (req, res, next) => {
            route(req, res, next).catch(next)
        }
    }

    _attachMiddleware() {
        this.router.use(json())
    }

    _handlePageNotFound() {
        this.router.all('*', (req, res) => {
            res.status(404).send('Page not found!')
        })
    }

    _attachApiRoutes() {
        this._attachRoutes(this.apiRoutes, '/api')
    }

   

    _attachRoutes(routeGroups, prefix = '') {
        routeGroups.forEach(({ group, routes }) => {
            routes.forEach(({ method, path, middleware = [], handler }) => {
                this.router[method](
                    prefix + group.prefix + path,
                    [...group.middleware || [], ...middleware],
                    this._catchError(handler))
            })
        })
    }
}

export default new Router()