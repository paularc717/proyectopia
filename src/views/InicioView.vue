<template>
  <DefaultLayout>
    <div class="container mx-auto p-6">
      <header class="text-center mb-8">
        <h1 class="text-4xl font-bold">Bienvenidos a Hope Harbor</h1>
        <p class="text-lg text-gray-600 mt-2">Una plataforma que conecta desarrolladores con inversionistas para hacer realidad proyectos innovadores.</p>
        <p class="text-md text-gray-500 mt-1">Únete a nuestra comunidad y lleva tus ideas al siguiente nivel.</p>
      </header>

      <div class="section mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="column p-4 border rounded shadow">
            <h2 class="text-2xl font-semibold">¿Qué es Hope Harbor?</h2>
            <p class="mt-2 text-gray-700">
              Hope Harbor es una plataforma diseñada para conectar desarrolladores de proyectos tecnológicos con
              inversionistas interesados en apoyar ideas innovadoras. Nuestro objetivo es facilitar la colaboración y el
              crecimiento mutuo a través de una interfaz intuitiva y herramientas eficaces.
            </p>
          </div>
          <div class="column p-4 border rounded shadow">
            <h2 class="text-2xl font-semibold">¿Qué hacemos?</h2>
            <p class="mt-2 text-gray-700">
              Ofrecemos a los desarrolladores un espacio para presentar sus experiencias laborales y proyectos previos,
              así como para compartir información sobre sus nuevos proyectos. Los inversionistas pueden explorar estos
              proyectos, conocer a los desarrolladores y establecer contacto para posibles colaboraciones.
            </p>
          </div>
        </div>
      </div>

      <div class="section mb-8">
        <h2 class="text-2xl font-semibold">Desarrolladores</h2>
        <p class="mt-2 text-gray-700">
          Los desarrolladores pueden crear perfiles detallados, subir información sobre sus proyectos y actualizar el
          progreso de los mismos. Esta visibilidad ayuda a atraer la atención de posibles inversionistas interesados en
          apoyar sus ideas.
        </p>
      </div>

      <div class="section mb-8">
        <h2 class="text-2xl font-semibold">Inversionistas</h2>
        <p class="mt-2 text-gray-700">
          Los inversionistas tienen acceso a una variedad de proyectos prometedores y pueden comunicarse directamente con
          los desarrolladores para discutir posibles inversiones. Hope Harbor facilita este proceso, asegurando que ambas
          partes se beneficien de la colaboración.
        </p>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../Layout/DefaultLayout.vue';

export default {
  components: {
    DefaultLayout,
  },
};
</script>

<style scoped>
/* Estilos opcionales para tu componente */
</style>