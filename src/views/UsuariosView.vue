<template>
  <DefaultLayout>
    <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 class="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <div v-if="loading" class="text-center">Cargando usuarios...</div>
      <div v-else>
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">Nombre</th>
              <th class="py-2 px-4 border-b">Correo Electrónico</th>
              <th class="py-2 px-4 border-b">Rol</th>
              <th class="py-2 px-4 border-b">Teléfono</th>
              <th class="py-2 px-4 border-b">Experiencia</th>
              <th class="py-2 px-4 border-b">Trabajo Anterior</th>
              <th class="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index) in userService.usersCollection" :key="usuario.id">
              <td class="py-2 px-4 border-b">{{ usuario.nombre }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.email }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.rol }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.telefono }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.experiencia }}</td>
              <td class="py-2 px-4 border-b">{{ usuario.trabajoAnterior }}</td>
              <td class="py-2 px-4 border-b">
                <!-- <button @click="editUser (usuario.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Editar</button> -->
                <button @click="deleteUser (usuario.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="!userService.usersCollection.length" class="text-center mt-4">No hay usuarios disponibles.</div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../Layout/DefaultLayout.vue';
import { ref, onMounted } from 'vue';
import { useUsersStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

export default {
  components: {
    DefaultLayout,
  },
  setup() {
    const userService = useUsersStore();
    const loading = ref(true);
    const router = useRouter();

    const fetchUsers = async () => {
      loading.value = true;
      try {
        await userService.loadUsers(); // Cargar usuarios desde el store
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      } finally {
        loading.value = false;
      }
    };

    const editUser  = (id) => {
      router.push(`/editar-usuario/${id}`); // Redirige a la vista de edición
    };

    const deleteUser  = async (id) => {
      if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {
          await userService.deleteUser (id); // Llamar a la función de eliminación del store
          await fetchUsers(); // Vuelve a cargar la lista de usuarios
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
        }
      }
    };

    onMounted(fetchUsers); // Cargar usuarios al montar el componente

    return {
      userService,
      loading,
      editUser ,
      deleteUser ,
    };
  },
};
</script>

<style scoped>
/* Estilos opcionales para tu componente */
</style>