<template>
    <DefaultLayout>
      <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h1 class="text-2xl font-bold mb-4">Lista de Proyectos</h1>
        <div v-if="loading" class="text-center">Cargando proyectos...</div>
        <div v-else>
          <table class="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b">Nombre</th>
                <th class="py-2 px-4 border-b">Link Demo</th>
                <th class="py-2 px-4 border-b">Lenguaje</th>
                <th class="py-2 px-4 border-b">Tipo</th>
                <th class="py-2 px-4 border-b">Valor</th>
                <th class="py-2 px-4 border-b">Progreso</th>
                <th class="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(proyecto, index) in projectService.projectsCollection" :key="proyecto.id">
                <td class="py-2 px-4 border-b">{{ proyecto.nombre }}</td>
                <td class="py-2 px-4 border-b">
                  <a :href="proyecto.linkDemo" target="_blank" class="text-blue-500 hover:underline">{{ proyecto.linkDemo }}</a>
                </td>
                <td class="py-2 px-4 border-b">{{ proyecto.lenguaje }}</td>
                <td class="py-2 px-4 border-b">{{ proyecto.tipo }}</td>
                <td class="py-2 px-4 border-b">{{ proyecto.valor }}</td>
                <td class="py-2 px-4 border-b">{{ proyecto.progreso }}%</td>
                <td class="py-2 px-4 border-b">
                  <button @click="editProject(proyecto.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Editar</button>
                  <button @click="deleteProject(proyecto.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!projectService.projectsCollection.length" class="text-center mt-4">No hay proyectos disponibles.</div>
        </div>
      </div>
    </DefaultLayout>
  </template>
  
  <script>
  import DefaultLayout from '../Layout/DefaultLayout.vue';
  import { ref, onMounted } from 'vue';
  import { useProjectsStore } from '../stores/useProjectsStore.js';
  import { useRouter } from 'vue-router';
  
  export default {
    components: {
      DefaultLayout,
    },
    setup() {
      const projectService = useProjectsStore();
      const loading = ref(true);
      const router = useRouter();
  
      const fetchProjects = async () => {
        loading.value = true;
        try {
          await projectService.loadProjects(); // Cargar proyectos desde el store
        } catch (error) {
          console.error('Error al obtener proyectos:', error);
        } finally {
          loading.value = false;
        }
      };
  
      const editProject = (id) => {
        router.push(`/editar-proyecto/${id}`); // Redirige a la vista de edición
      };
  
      const deleteProject = async (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
          try {
            await projectService.deleteProject(id); // Llamar a la función de eliminación del store
            await fetchProjects(); // Vuelve a cargar la lista de proyectos
          } catch ( error) {
            console.error('Error al eliminar el proyecto:', error);
          }
        }
      };
  
      onMounted(fetchProjects); // Cargar proyectos al montar el componente
  
      return {
        projectService,
        loading,
        editProject,
        deleteProject,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales para tu componente */
  </style>