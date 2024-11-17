import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { auth } from '@/config/firebase'; // Ajusta la ruta según tu estructura de carpetas
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
    const authUser   = ref(null);
    const router = useRouter();

    const errorMsg = ref('');
    const errorCodes = {
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'El password es incorrecto',
        'auth/email-already-in-use': 'El email ya está en uso',
    };

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authUser .value = user;
            } else {
                authUser .value = null; // Asegúrate de establecer a null si no hay usuario
            }
        });
    });

    const login = async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            authUser .value = user;
            router.push({ name: 'Inicio' });
        } catch (error) {
            console.log(error);
            errorMsg.value = errorCodes[error.code] || 'Error desconocido';
        }
    };

    const register = async ({ email, password }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            authUser .value = user;
            router.push({ name: 'Inicio' });
        } catch (error) {
            console.log(error);
            errorMsg.value = errorCodes[error.code] || 'Error desconocido';
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            authUser .value = null;
            router.push({ name: 'Home' });
        } catch (error) {
            console.log(error);
        }
    };

    const hasError = computed(() => {
        return errorMsg.value;
    });

    const isAuth = computed(() => {
        return authUser .value !== null; // Devuelve true si hay un usuario autenticado
    });

    return {
        login,
        register,
        logout,
        hasError,
        errorMsg,
        isAuth,
    };
});