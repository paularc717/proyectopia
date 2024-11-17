<template>
  <DefaultLayout>
    <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h2 class="text-2xl font-bold mb-4">Crear Proyecto</h2>
      <form @submit.prevent="submit">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="nombre">
              Nombre del Proyecto
            </label>
            <input v-model="form.nombre" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="nombre" type="text" required />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="linkDemo">
              Link Demo
            </label>
            <input v-model="form.linkDemo" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="linkDemo" type="url" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="valor">
              Valor
            </label>
            <input v-model.number="form.valor" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="valor" type="number" />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="progreso">
              Progreso
            </label>
            <input v-model.number="form.progreso" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="progreso" type="number" />
          </div>
        </div>
        <div class="mb-6">
          <h3 class="text-lg font-bold mb-2">Seleccionar Lenguaje de Desarrollo</h3>
          <select v-model="form.lenguaje" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
            <option v-for="lenguaje in lenguajes" :key="lenguaje" :value="lenguaje">
              {{ lenguaje }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <h3 class="text-lg font-bold mb-2">Seleccionar Tipo</h3>
          <select v-model="form.tipo" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
            <option v-for="tipo in tipos" :key="tipo" :value="tipo">
              {{ tipo }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="descripcion">
            Descripción
          </label>
          <textarea v-model="form.descripcion" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="descripcion"></textarea>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Guardar</button>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../Layout/DefaultLayout.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectsStore } from '../stores/useProjectsStore.js';

export default {
  components: {
    DefaultLayout,
  },
  setup() {
    const form = ref({
      nombre: '',
      linkDemo: '',
      valor: 0,
      progreso: 0,
      lenguaje: '', // Cambiado a un string
      tipo: '', // Cambiado a un string
      descripcion: '',
    });
    const successMessage = ref('');
    const errorMessage = ref('');
    const loading = ref(false);
    const router = useRouter();
    const projectService = useProjectsStore();

    // Define las listas de lenguajes y tipos
    const lenguajes = ref(['JavaScript', 'Python', 'Java', 'C#', 'Ruby', 'PHP']);
    const tipos = ref(['Web', 'Móvil', 'Escritorio', 'API', 'Juego']);

    const submit = async () => {
      if (Object.values(form.value).some(value => !value)) return;

      try {
        loading.value = true;
        const project = { ...form.value };
        const id = form.value.idProject;

        if (id) {
          await projectService.updateProject(id, project);
        } else {
          await projectService.createProject(project);
        }

        successMessage.value = `Proyecto ${id ? 'actualizado' : 'creado'} correctamente.`;
        errorMessage.value = ''; // Clear any previous error message
        router.push('/proyectos');
      } catch (error) {
        errorMessage.value = 'Ocurrió un problema.';
        successMessage.value = ''; // Clear any previous success message
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      submit,
      successMessage,
      errorMessage,
      loading,
      lenguajes,
      tipos,
    };
  },
};
</script> 
