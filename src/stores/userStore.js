import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useFirestore } from 'vuefire';
import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc, getDoc } from 'firebase/firestore';

export const useUsersStore = defineStore('users', () => {
  const db = useFirestore();
  const usersCollection = ref([]);

  // Crear un nuevo usuario
  async function createUser (user) {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        nombre: user.nombre,
        email: user.email,
        password: user.password, // Asegúrate de manejar las contraseñas de manera segura
        rol: user.rol,
        telefono: user.telefono,
        direccion: user.direccion,
        experiencia: user.experiencia,
        trabajoAnterior: user.trabajoAnterior,
        habilidades: user.habilidades,
      });
      console.log('Usuario creado con ID:', docRef.id);
      await loadUsers(); // Recargar usuarios después de agregar uno nuevo
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  }

  // Obtener un usuario por ID
  async function getUserById(id) {
    try {
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }; // Retorna el usuario con su ID
      } else {
        console.log("No hay tal documento!");
        return null; // Retorna null si no existe el documento
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return null; // Retorna null en caso de error
    }
  }

  // Actualizar un usuario
  async function updateUser (id, user) {
    try {
      const docRef = doc(db, 'users', id);
      await updateDoc(docRef, {
        nombre: user.nombre,
        email: user.email,
        password: user.password, // Asegúrate de manejar las contraseñas de manera segura
        rol: user.rol,
        telefono: user.telefono,
        direccion: user.direccion,
        experiencia: user.experiencia,
        trabajoAnterior: user.trabajoAnterior,
        habilidades: user.habilidades,
      });
      console.log("Usuario actualizado:", id);
      await loadUsers(); // Recargar usuarios después de la actualización
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  }

  // Función para cargar usuarios
  const loadUsers = async () => {
    try {
      const q = collection(db, 'users');
      const snapshot = await getDocs(q);
      usersCollection.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log("Usuarios cargados:", usersCollection.value);
    } catch (error) {
      console.error("Error al cargar usuarios: ", error);
    }
  };

  // Eliminar un usuario
  async function deleteUser (id) {
    try {
      const docRef = doc(db, 'users', id);
      await deleteDoc(docRef);
      console.log("Usuario eliminado:", id);
      await loadUsers(); // Recargar usuarios después de la eliminación
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  }

  // Cargar usuarios al inicializar el store
  loadUsers();

  return {
    usersCollection,
    createUser ,
    updateUser ,
    deleteUser ,
    loadUsers,
    getUserById,
  };
});