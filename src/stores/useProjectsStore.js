import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useFirestore } from 'vuefire';
import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc,getDoc } from 'firebase/firestore';

export const useProjectsStore = defineStore('projects', () => {
  const db = useFirestore();
  const projectsCollection = ref([]);

  // Crear un nuevo proyecto
 // Crear un nuevo proyecto
async function createProject(project) {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      // Asegúrate de que el objeto tenga las propiedades correctas
      nombre: project.nombre,
      linkDemo: project.linkDemo,
      valor: project.valor,
      progreso: project.progreso,
      lenguaje: project.lenguaje, // Cambiado a 'lenguaje'
      tipo: project.tipo, // Cambiado a 'tipo'
      descripcion: project.descripcion,
    });
    console.log('Proyecto creado con ID:', docRef.id);
    await loadProjects(); // Recargar proyectos después de agregar uno nuevo
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
  }
}

// Obtener un proyecto por ID
async function getProjectById(id) {
  try {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }; // Retorna el proyecto con su ID
    } else {
      console.log("No hay tal documento!");
      return null; // Retorna null si no existe el documento
    }
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    return null; // Retorna null en caso de error
  }
}

// Actualizar un proyecto
async function updateProject(id, project) {
  try {
    const docRef = doc(db, 'projects', id);
    await updateDoc(docRef, {
      // Asegúrate de que el objeto tenga las propiedades correctas
      nombre: project.nombre,
      linkDemo: project.linkDemo,
      valor: project.valor,
      progreso: project.progreso,
      lenguaje: project.lenguaje, // Cambiado a 'lenguaje'
      tipo: project.tipo, // Cambiado a 'tipo'
      descripcion: project.descripcion,
    });
    console.log("Proyecto actualizado:", id);
    await loadProjects(); // Recargar proyectos después de la actualización
  } catch (error) {
    console.error("Error al actualizar el proyecto:", error);
  }
}

  // Función para cargar proyectos
  const loadProjects = async () => {
    try {
      const q = collection(db, 'projects');
      const snapshot = await getDocs(q);
      projectsCollection.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Proyectos cargados:", projectsCollection.value);
    } catch (error) {
      console.error("Error al cargar proyectos: ", error);
    }
  };

  // Eliminar un proyecto
  async function deleteProject(id) {
    try {
      const docRef = doc(db, 'projects', id);
      await deleteDoc(docRef);
      console.log("Proyecto eliminado:", id);
      await loadProjects(); // Recargar proyectos después de la eliminación
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
    }
  }

  // Cargar proyectos al inicializar el store
  loadProjects();

  return {
    projectsCollection,
    createProject,
    updateProject,
    deleteProject, // Asegúrate de exportar deleteProject
    loadProjects,
    getProjectById, 
  };
}); 