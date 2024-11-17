<template>
  <DefaultLayout>
    <div class="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h2 class="text-2xl font-bold mb-4">Crear Usuario</h2>
      <form @submit.prevent="submit">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="nombre">
              Nombre
            </label>
            <input v-model="form.nombre" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="nombre" type="text" required />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
              Correo Electrónico
            </label>
            <input v-model="form.email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="email" type="email" required />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password">
              Contraseña
            </label>
            <input v-model="form.password" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="password" type="password" required />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="rol">
              Rol
            </label>
            <select v-model="form.rol" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
              <option value="" disabled selected>Selecciona un rol</option>
              <option value="admin">Admin</option>
              <option value="usuario">Usuario</option>
              <option value="editor">Editor</option>
            </select>
          </div>
        </div>
        <div class="mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="telefono">
            Teléfono
          </label>
          <input v-model="form.telefono" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="telefono" type="tel" />
        </div>
        <div class="mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="direccion">
            Dirección
          </label>
          <textarea v-model="form.direccion" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="direccion"></textarea>
        </div>
        <div class="mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="experiencia">
            Tipo de Experiencia
          </label>
          <select v-model="form.experiencia" class="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">
            <option value="" disabled selected>Selecciona un tipo de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>
        <div class="mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="trabajoAnterior">
            Dónde ha Trabajado
          </label>
          <textarea v-model="form.trabajoAnterior" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="trabajoAnterior"></textarea>
        </div>
        <div class="mb-6">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="habilidades">
            Habilidades
          </label>
          <textarea v-model="form.habilidades" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="habilidades"></textarea>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Guardar</button>

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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '../stores/userStore'
export default {
  components: {
    DefaultLayout,
  },
  setup() {
    const form = ref({
      nombre: '',
      email: '',
      password: '',
      rol: '',
      telefono: '',
      direccion: '',
      experiencia: '',
      trabajoAnterior: '',
      habilidades: '',
    });
    const successMessage = ref('');
    const errorMessage = ref('');
    const loading = ref(false);
    const router = useRouter();
    const userService = useUsersStore();

    const submit = async () => {
      if (Object.values(form.value).some(value => !value)) return;

      try {
        loading.value = true;
        await userService.createUser (form.value);
        successMessage.value = 'Usuario creado correctamente.';
        errorMessage.value = '';
        router.push('/usuarios');
      } catch (error) {
        errorMessage.value = 'Ocurrió un problema al crear el usuario.';
        successMessage.value = '';
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
    };
  },
};
</script>