<template>
  <div class="flex min-h-screen">
    <div class="w-64 bg-gradient-to-b from-purple-600 to-pink-500 border-r border-gray-200">
      <div class="py-4 px-6">
        <a href="/">
          <ApplicationLogo class="w-full h-9" />
        </a>
      </div>

      <div class="mb-10">
        <h3 class="mx-6 mb-2 text-xs text-gray-200 uppercase tracking-widest">
          Principal
        </h3>

        <a v-for="(item, index) in mainNavigation"
           :href="item.href" :key="index" class="flex items-center px-6 py-2.5 text-gray-200 hover:text-orange-300 group">
          <component
            :is="item.icon"
            class="h-5 w-5 text-gray-200 mr-2 group-hover:text-orange-300" />
          {{ item.label }}
        </a>
      </div>
      <div class="mb-10">
        <h3 class="mx-6 mb-2 text-xs text-gray-200 uppercase tracking-widest">
          Perfil
        </h3>
        <button @click="logout" class="flex items-center px-6 py-2.5 text-gray-200 hover:text-orange-300 group">
          <CogIcon class="h-5 w-5 text-gray-200 mr-2 group-hover:text-orange-300" />
          Cerrar Sesión
        </button>
      </div>
    </div>
    <main class="flex-1 p-6">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import { HomeIcon, UserIcon, UsersIcon, DocumentIcon, FolderIcon, CogIcon } from '@heroicons/vue/outline';
import ApplicationLogo from '../components/icons/IconCommunity.vue';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

export default {
  components: { ApplicationLogo, HomeIcon, UserIcon, UsersIcon, DocumentIcon, FolderIcon, CogIcon },
  data() {
    return {
      mainNavigation: [
        { href: '/home', label: 'Inicio', icon: HomeIcon },
        { href: '/perfil', label: 'Perfil', icon: UserIcon },
        { href: '/usuarios', label: 'Usuarios', icon: UsersIcon },
        { href: '/datos-usuarios', label: 'Datos Usuarios', icon: DocumentIcon },
        { href: '/proyectos', label: 'Proyectos', icon: FolderIcon },
        { href: '/gestion-proyectos', label: 'Gestion de proyectos', icon: CogIcon },
      ],
      following: [
        { href: '/', label: 'Cerrar Sesion', imageUrl: 'https://pbs.twimg.com/profile_images/1333896976602193922/MtWztkxt_400x400.jpg' },
      ],
    };
  },
  setup() {
    const router = useRouter();

    const logout = async () => {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log('Sesión cerrada');
        // Redirigir a la página de login
        router.push('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    };

    return {
      logout,
    };
  },
};
</script>

<style scoped>
/* Puedes agregar más estilos aquí si es necesario */
</style>