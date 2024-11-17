<template>
    <DefaultLayout>
      <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Editar Proyecto' : 'Crear Proyecto' }}</h2>
        <form @submit.prevent="submit">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="nombre">
                Nombre del Proyecto
              </label>
              <input v-model="form.nombre" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="nombre" type="text" required />
              <div v-if="errors.nombre" class="text-red-500 text-xs italic">{{ errors.nombre }}</div>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="linkDemo">
                Link Demo
              </label>
              <input v-model="form.linkDemo" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="linkDemo" type="url" />
              <div v-if="errors.linkDemo" class="text-red-500 text-xs italic">{{ errors.linkDemo }}</div>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="valor">
                Valor
              </label>
              <input v-model.number="form.valor" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="valor" type="number" />
              <div v-if="errors.valor" class="text-red-500 text-xs italic">{{ errors.valor }}</div>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="progreso">
                Progreso
              </label>
              <input v-model.number="form.progreso" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="progreso" type="number" />
              <div v-if="errors.progreso" class="text-red-500 text-xs italic">{{ errors.progreso }}</div>
            </div>
          </div>
          <div class="mb-6">
            <h3 class="text-lg font-bold mb-2">Seleccionar Lenguaje de Desarrollo</h3>
            <select v-model="form.lenguaje" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
              <option v-for="lenguaje in lenguajes" :key="lenguaje" :value="lenguaje">
                {{ lenguaje }}
              </option>
            </select>
            <div v-if="errors.lenguaje" class="text-red-500 text-xs italic">{{ errors.lenguaje }}</div>
          </div>
          <div class="mb-6">
            <h3 class="text-lg font-bold mb-2">Seleccionar Tipo</h3>
            <select v-model="form.tipo" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
              <option v-for="tipo in tipos" :key="tipo" :value="tipo">
                {{ tipo }}
              </ option>
            </select>
            <div v-if="errors.tipo" class="text-red-500 text-xs italic">{{ errors.tipo }}</div>
          </div>
          <div class="mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="descripcion">
              Descripción
            </label>
            <textarea v-model="form.descripcion" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="descripcion" rows="4"></textarea>
            <div v-if="errors.descripcion" class="text-red-500 text-xs italic">{{ errors.descripcion }}</div>
          </div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">{{ isEditing ? 'Actualizar' : 'Guardar' }}</button>
  
          <div v-if="successMessage" class="success-message mt-4 text-green-500">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="error-message mt-4 text-red-500">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </DefaultLayout>
  </template>
  
  <script>
  import DefaultLayout from '../Layout/DefaultLayout.vue';
  import { ref, onMounted } from 'vue';
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
        lenguaje: '',
        tipo: '',
        descripcion: '',
      });
      const errors = ref({});
      const successMessage = ref('');
      const errorMessage = ref('');
      const loading = ref(false);
      const router = useRouter();
      const projectService = useProjectsStore();
      const lenguajes = ref(['JavaScript', 'Python', 'Java', 'C#', 'Ruby']);
      const tipos = ref(['Web', 'Móvil', 'Escritorio']);
      const isEditing = ref(false);
      const projectId = ref(null);
  
      const validateForm = () => {
        errors.value = {}; // Reset errors
        let isValid = true;
  
        if (!form.value.nombre) {
          errors.value.nombre = 'El nombre del proyecto es requerido.';
          isValid = false;
        }
        if (!form.value.linkDemo) {
          errors.value.linkDemo = 'El link demo es requerido.';
          isValid = false;
        }
        if (!form.value.lenguaje) {
          errors.value.lenguaje = 'Selecciona un lenguaje de desarrollo.';
          isValid = false;
        }
        if (!form.value.tipo) {
          errors.value.tipo = 'Selecciona un tipo de proyecto.';
          isValid = false;
        }
        // Add more validation as needed
  
        return isValid;
      };
  
      const submit = async () => {
        if (!validateForm()) return; // Validate before submission
  
        try {
          loading.value = true;
          const project = { ...form.value };
          if (isEditing.value) {
            await projectService.updateProject(projectId.value, project); // Adjust based on your logic
            successMessage.value = 'Proyecto actualizado correctamente.';
          } else {
            await projectService.createProject(project); // Adjust based on your logic
            successMessage.value = 'Proyecto creado correctamente.';
          }
          errorMessage.value = ''; // Clear any previous error message
          router.push('/proyectos');
        } catch (error) {
          errorMessage.value = 'Ocurrió un problema.';
          successMessage.value = ''; // Clear any previous success message
        } finally {
          loading.value = false;
        }
      };
  
      onMounted(async () => {
  const id = router.currentRoute.value.params.id; // Obtener el ID del proyecto desde la ruta
  console.log("ID del proyecto:", id); // Verifica el ID
  if (id) {
    isEditing.value = true;
    projectId.value = id;
    const project = await projectService.getProjectById(id); // Obtener los datos del proyecto
    console.log("Proyecto obtenido:", project); // Verifica el proyecto obtenido
    if (project) {
      form.value = { ...project }; // Rellenar el formulario con los datos del proyecto
    } else {
      errorMessage.value = 'No se encontró el proyecto.'; // Manejo de errores si no se encuentra el proyecto
    }
  }
});
    return {
      form,
      errors,
      submit,
      successMessage,
      errorMessage,
      loading,
      lenguajes,
      tipos,
      isEditing,
    };
  },
};
  </script>