export default {
    admin: [
        {
            name: 'Buscar Propiedades',
            url: '/admin/dwellings/search',
            icon: 'icon-magnifier'
        },
        {
            name: 'SIOC',
            url: '/dashboard',
            icon: 'icon-emotsmile',
            children: [
                // {
                //     name: 'Noticias',
                //     url: '/dashboard/dashboard',
                //     icon: 'icon-layers'
                // },
                {
                    name: 'Propiedades SIOC',
                    url: '/admin/dwellings/reports',
                    icon: 'icon-chart'
                },
                {
                    name: 'Últimas Publicadas',
                    url: '/dwellings/latest',
                    icon: 'icon-energy'
                },
                {
                    name: 'Tasaciones',
                    url: '/admin/dwellings/appraisals',
                    icon: 'icon-layers'
                }
            ]
        },
        {
            name: 'Clientes',
            url: '/clients',
            icon: 'icon-people',
            children: [
                {
                    name: 'Agregar Cliente',
                    url: '/admin/clients/new',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Buscar Clientes',
                    url: '/admin/clients/search',
                    icon: 'icon-magnifier'
                }
            ]
        },
        {
            name: 'Equipos SIOC',
            url: '/admin/team',
            icon: 'icon-layers',
            children: [
                {
                    name: 'Agregar Inmobiliaria',
                    url: '/admin/team/add',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Inmobiliarias',
                    url: '/admin/team/list',
                    icon: 'icon-magnifier'
                }
            ]
        },
        {
            name: 'Usuarios',
            icon: 'icon-layers',
            children: [
                {
                    name: 'Martilleros',
                    url: '/admin/auctioneers/auctioneers',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Capitanes',
                    url: '/admin/captains/captains',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Vendedores',
                    url: '/admin/sellers/sellers',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Usuarios',
                    url: '/admin/users/list',
                    icon: 'icon-layers',
                }
            ]
        }
    ],
    martillero: [
        {
            name: 'Buscar Propiedades',
            url: '/admin/dwellings/search',
            icon: 'icon-magnifier'
        },
        {
            name: 'Mi Equipo',
            url: '#',
            icon: 'icon-home',
            children: [
                {
                    name: 'Nuestras Propiedades',
                    url: '/agency/dwellings/reports',
                    icon: 'icon-chart'
                },
                {
                    name: 'Agregar Propiedad',
                    url: '/admin/dwellings/general',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Últimas Publicadas',
                    url: '/admin/dwellings/latest',
                    icon: 'icon-energy'
                },
                {
                    name: 'Propiedades Favoritas',
                    url: '/dwellings/favorite',
                    icon: 'icon-star'
                },
                {
                    name: 'Mi Equipo',
                    url: '/admin/sellers/sellers',
                    icon: 'icon-pencil'
                }
            ]
        },
        {
            name: 'Clientes',
            url: '/clients',
            icon: 'icon-people',
            children: [
                {
                    name: 'Agregar Cliente',
                    url: '/admin/clients/new',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Mis Clientes',
                    url: '/admin/clients/search',
                    icon: 'icon-magnifier'
                },
                {
                    name: 'Pedidos de visita',
                    url: '/admin/team/ask',
                    icon: 'icon-emotsmile',
                },
                {
                    name: 'Tasaciones',
                    url: '/admin/dwellings/appraisals',
                    icon: 'icon-layers',
                }
            ]
        },
        {
            name: 'SIOC',
            url: '/dashboard',
            icon: 'icon-emotsmile',
            children: [
                // {
                //     name: 'Noticias',
                //     url: '/dashboard/dashboard',
                //     icon: 'icon-layers'
                // },
                {
                    name: 'Propiedades SIOC',
                    url: '/admin/dwellings/reports',
                    icon: 'icon-chart'
                },
                {
                    name: 'Integrantes',
                    url: '/admin/team/list',
                    icon: 'icon-magnifier'
                },
                {
                    name: 'Últimas Publicadas',
                    url: '/dwellings/latest',
                    icon: 'icon-energy'
                },
                {
                    name: 'Tasaciones',
                    url: '/dwellings/appraisals',
                    icon: 'icon-layers'
                }
            ]
        }
    ],
    vendedor: [
        {
            name: 'Buscar Propiedades',
            url: '/admin/dwellings/search',
            icon: 'icon-magnifier'
        },
        {
            name: 'Mi Equipo',
            url: '/admin/dwellings',
            icon: 'icon-home',
            children: [
                {
                    name: 'Nuestras Propiedades',
                    url: '/agency/dwellings/reports',
                    icon: 'icon-chart'
                },
                {
                    name: 'Agregar Propiedad',
                    url: '/admin/dwellings/general',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Últimas Publicadas',
                    url: '/admin/dwellings/latest',
                    icon: 'icon-energy'
                },
                {
                    name: 'Propiedades Favoritas',
                    url: '/dwellings/favorite',
                    icon: 'icon-star'
                }
            ]
        },
        {
            name: 'Clientes',
            url: '/clients',
            icon: 'icon-people',
            children: [
                {
                    name: 'Agregar Cliente',
                    url: '/admin/clients/new',
                    icon: 'icon-pencil'
                },
                {
                    name: 'Mis Clientes',
                    url: '/admin/clients/search',
                    icon: 'icon-magnifier'
                },
                {
                    name: 'Tasaciones',
                    url: '/admin/dwellings/appraisals',
                    icon: 'icon-layers',
                },
                {
                    name: 'Pedidos de visita',
                    url: '/admin/team/ask',
                    icon: 'icon-emotsmile',
                }
            ]
        },
        {
            name: 'SIOC',
            url: '/dashboard',
            icon: 'icon-emotsmile',
            // badge: {
            //     variant: 'info',
            //     text: 'NEW'
            // }
            children: [
                // {
                //     name: 'Noticias',
                //     url: '/dashboard/dashboard',
                //     icon: 'icon-layers'
                // },
                {
                    name: 'Últimas Publicadas',
                    url: '/dwellings/latest',
                    icon: 'icon-energy'
                },
                {
                    name: 'Tasaciones',
                    url: '/dwellings/appraisals',
                    icon: 'icon-layers'
                },
                {
                    name: 'Equipos SIOC',
                    url: '/admin/team/list',
                    icon: 'icon-layers'
                }
            ]
        }
    ],
    user: [
        // {
        //     name: 'Mis Propiedades',
        //     url: '/dashboard',
        //     icon: 'icon-emotsmile',
        //     children: [
        //         {
        //             name: 'Tasaciones',
        //             url: '/admin/dwellings/appraisals',
        //             icon: 'icon-energy'
        //         },
        //         {
        //             name: 'En Alquiler',
        //             url: '',
        //             icon: 'icon-energy'
        //         },
        //         {
        //             name: 'En Venta',
        //             url: '',
        //             icon: 'icon-energy'
        //         },
        //         {
        //             name: 'Pedidos de visita',
        //             url: '',
        //             icon: 'icon-energy'
        //         }
        //     ]
        // },
        {
            name: 'Favoritas',
            url: '/dwellings/favorite',
            icon: 'icon-layers'
        },
        {
            name: 'Últimas Publicadas',
            url: '/dwellings/latest',
            icon: 'icon-energy'
        }
    ],
    cliente: [
        {
            name: 'Favoritas',
            url: '/dwellings/favorite',
            icon: 'icon-layers'
        },
        {
            name: 'Últimas Publicadas',
            url: '/dwellings/latest',
            icon: 'icon-energy'
        },
        {
            name: 'Mis Propiedades',
            url: '/dwellings/mine',
            icon: 'icon-home'
        }
    ]
};
