import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InicioView from '@/views/InicioView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useAuthStore } from '@/stores/auth' // Asegúrate de que tu tienda de autenticación esté importada
import ProyectosView from '@/views/ProyectosView.vue'
import PerfilView from '@/views/PerfilView.vue'
import DatosUsuariosView from '../views/DatosusuariosView.Vue'
import UsuariosView from '@/views/UsuariosView.vue'
import GestionProyectoView from '@/views/GestionProyectoView.vue'
import EditProject from '@/views/EditProject.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login', // Redirige a la ruta de inicio de sesión
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'Inicio',
      component: InicioView,
    },
    {
      path: '/datos-usuarios',
      name: 'DatosUsuarios',
      component: DatosUsuariosView,
    },
    {
      path: '/perfil',
      name: 'Perfil',
      component: PerfilView,
    },
    {
      path: '/Proyectos',
      name: 'Proyectos',
      component: ProyectosView,
    },
    {
      path: '/editar-proyecto/:id',
      name: 'Editar Proyecto',
      component: EditProject,
    },
    {
      path: '/gestion-proyectos',
      name: 'Gestion de proyectos',
      component: GestionProyectoView,
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: UsuariosView,
    },
    {
      path: '/registro',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

// Guard de navegación
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  const auth = useAuthStore() // Obtiene la tienda de autenticación

  if (requiresAuth && !auth.isAuthenticated) { // Verifica si el usuario está autenticado
    next({ name: 'login' }) // Redirige a la página de inicio de sesión si no está autenticado
  } else {
    next() // Permite el acceso a la ruta
  }
})

export default router