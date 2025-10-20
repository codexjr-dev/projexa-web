import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Cadastro from '../pages/Cadastro.vue'
import Login from '../pages/Login.vue'
import Member from '../pages/Member.vue'
import ProjectList from '../pages/ProjectList.vue'
import Project from '../pages/Project/Project.vue'
import AllNews from '../pages/AllNews/AllNews.vue'
import ViewNews from '../pages/ViewNews/ViewNews.vue'
import Link from '../pages/Link.vue'
import Settings from '../pages/Settings.vue'
import OrganizationManagement from '../pages/OrganizationManagement/OrganizationManagement.vue'


const isUsuarioAutenticado = () => {
    return !!localStorage.getItem('@jwt')
}

const isPresident = () => {
    return localStorage.getItem('@role') === 'Presidente'
}

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Login',
        path: '/entrar',
        component: Login
    },
    {
        name: 'Cadastro',
        path: '/cadastrar',
        component: Cadastro
    },
    {
        name: 'Member',
        path: '/membros',
        component: Member,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'ProjectList',
        path: '/projetos',
        component: ProjectList,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'Project',
        path: '/project/:projectId',
        component: Project,
        meta: {
            requiresAuth: true
        }
    },
    {
      name: 'AllNews',
      path: '/allnews',
      component: AllNews,
      meta: {
          requiresAuth: true
      }
    },
    {
      name: 'ViewNews',
      path: '/project/:projectId/news',
      component: ViewNews,
      meta: {
          requiresAuth: true
      }
    },
    {
        name: 'Link',
        path: '/links',
        component: Link,
        meta: {
            requiresAuth: true
        }
    },
    {
        name: 'Settings',
        path: '/configuracoes',
        component: Settings,
        meta: {
            requiresAuth: true,
            requiresPresidentRole: true
        }
    },
    {
        name: 'OrganizationManagement',
        path: '/organizacoes',
        component: OrganizationManagement,
        meta: {
            requiresAuth: true
        }
    }

]

const noAuthRoutes = ['/cadastrar', '/entrar', '/']

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

router.beforeEach((to, from, next) => {
    if (from.path === '/' && noAuthRoutes.includes(to.path)) {
            next()
        
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        next()
           
    } 
})

export default router;