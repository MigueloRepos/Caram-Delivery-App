/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as CarritoRouteImport } from './routes/carrito'
import { Route as CatalogoRouteImport } from './routes/catalogo'
import { Route as DulcesRouteImport } from './routes/dulces'
import { Route as CategoriaIdRouteImport } from './routes/categoria.$id'
import { Route as ProductoIdRouteImport } from './routes/producto.$id'
import { Route as PedidoListoRouteImport } from './routes/pedido-listo'

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)

const CarritoRoute = CarritoRouteImport.update({
  id: '/carrito',
  path: '/carrito',
  getParentRoute: () => rootRouteImport,
} as any)

const CatalogoRoute = CatalogoRouteImport.update({
  id: '/catalogo',
  path: '/catalogo',
  getParentRoute: () => rootRouteImport,
} as any)

const DulcesRoute = DulcesRouteImport.update({
  id: '/dulces',
  path: '/dulces',
  getParentRoute: () => rootRouteImport,
} as any)

const CategoriaIdRoute = CategoriaIdRouteImport.update({
  id: '/categoria/$id',
  path: '/categoria/$id',
  getParentRoute: () => rootRouteImport,
} as any)

const ProductoIdRoute = ProductoIdRouteImport.update({
  id: '/producto/$id',
  path: '/producto/$id',
  getParentRoute: () => rootRouteImport,
} as any)

const PedidoListoRoute = PedidoListoRouteImport.update({
  id: '/pedido-listo',
  path: '/pedido-listo',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/carrito': typeof CarritoRoute
  '/catalogo': typeof CatalogoRoute
  '/dulces': typeof DulcesRoute
  '/categoria/$id': typeof CategoriaIdRoute
  '/producto/$id': typeof ProductoIdRoute
  '/pedido-listo': typeof PedidoListoRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/carrito': typeof CarritoRoute
  '/catalogo': typeof CatalogoRoute
  '/dulces': typeof DulcesRoute
  '/categoria/$id': typeof CategoriaIdRoute
  '/producto/$id': typeof ProductoIdRoute
  '/pedido-listo': typeof PedidoListoRoute
}

export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/carrito': typeof CarritoRoute
  '/catalogo': typeof CatalogoRoute
  '/dulces': typeof DulcesRoute
  '/categoria/$id': typeof CategoriaIdRoute
  '/producto/$id': typeof ProductoIdRoute
  '/pedido-listo': typeof PedidoListoRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/carrito'
    | '/catalogo'
    | '/dulces'
    | '/categoria/$id'
    | '/producto/$id'
    | '/pedido-listo'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/carrito'
    | '/catalogo'
    | '/dulces'
    | '/categoria/$id'
    | '/producto/$id'
    | '/pedido-listo'
  id:
    | '__root__'
    | '/'
    | '/carrito'
    | '/catalogo'
    | '/dulces'
    | '/categoria/$id'
    | '/producto/$id'
    | '/pedido-listo'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CarritoRoute: typeof CarritoRoute
  CatalogoRoute: typeof CatalogoRoute
  DulcesRoute: typeof DulcesRoute
  CategoriaIdRoute: typeof CategoriaIdRoute
  ProductoIdRoute: typeof ProductoIdRoute
  PedidoListoRoute: typeof PedidoListoRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/carrito': {
      id: '/carrito'
      path: '/carrito'
      fullPath: '/carrito'
      preLoaderRoute: typeof CarritoRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/catalogo': {
      id: '/catalogo'
      path: '/catalogo'
      fullPath: '/catalogo'
      preLoaderRoute: typeof CatalogoRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/dulces': {
      id: '/dulces'
      path: '/dulces'
      fullPath: '/dulces'
      preLoaderRoute: typeof DulcesRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/categoria/$id': {
      id: '/categoria/$id'
      path: '/categoria/$id'
      fullPath: '/categoria/$id'
      preLoaderRoute: typeof CategoriaIdRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/producto/$id': {
      id: '/producto/$id'
      path: '/producto/$id'
      fullPath: '/producto/$id'
      preLoaderRoute: typeof ProductoIdRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/pedido-listo': {
      id: '/pedido-listo'
      path: '/pedido-listo'
      fullPath: '/pedido-listo'
      preLoaderRoute: typeof PedidoListoRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CarritoRoute: CarritoRoute,
  CatalogoRoute: CatalogoRoute,
  DulcesRoute: DulcesRoute,
  CategoriaIdRoute: CategoriaIdRoute,
  ProductoIdRoute: ProductoIdRoute,
  PedidoListoRoute: PedidoListoRoute,
}

export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
