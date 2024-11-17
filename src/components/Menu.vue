<template>
    <div class="flex min-h-screen">
      <div class="w-64 bg-gray-50 border-r border-gray-200">
        <div class="py-4 px-6">
          <a href="/">
            <ApplicationLogo class="w-full h-9"/>
          </a>
        </div>
  
        <div class="mb-10">
          <h3 class="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">
            Principal
          </h3>
  
          <a v-for="(item, index) in mainNavigation"
             :href="item.href" :key="index" class="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
            <component
              :is="item.icon"
              class="h-5 w-5 text-gray-400 mr-2 group-hover:text-orange-500"/>
            {{ item.label }}
          </a>
        </div>
        <div class="mb-10">
          <h3 class="mx-6 mb-2 text-xs text-gray-400 uppercase tracking-widest">
            Perfil
          </h3>
  
  
          <a v-for="(item, index) in following"
             :href="item.href" :key="index" class="flex items-center px-6 py-2.5 text-gray-500 hover:text-orange-600 group">
            <img :src="item.imageUrl" alt="" class="w-7 h-7 rounded-full mr-2">
            {{ item.label }}
          </a>
        </div>
      </div>
  
      <div class="flex-1">
        <div class="flex justify-between py-3 px-6 bg-gray-50 border-b space-x-6">
          <form action="" class="w-full max-w-md">
            <div class="relative flex items-center text-gray-400 focus-within:text-gray-600">
              <SearchIcon class="w-5 h-5 absolute ml-3 pointer-events-none"/>
              <input
                type="text"
                name="search"
                placeholder="Search talk"
                autocomplete="off"
                aria-label="Search talk"
                class="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              >
            </div>
          </form>
          <Menu as="div" class="relative flex-shrink-0">
            <MenuButton class="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
              <img class="inline w-10 h-10 rounded-full" src="https://pbs.twimg.com/profile_images/1333896976602193922/MtWztkxt_400x400.jpg" alt="">
            </MenuButton>
  
            <transition
              enter-active-class="transition duration-100 ease-out transform"
              enter-from-class="opacity-0 scale-90"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition duration-100 ease-in transform"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-90"
            >
              <MenuItems class="overflow-hidden absolute right-0 mt-2 w-48 bg-white rounded-md border shadow-lg origin-top-right focus:outline-none">
                <MenuItem v-slot="{active}">
                  <a href="#" :class="{'bg-gray-100': active}" class="block py-2 px-4 text-sm text-gray-700">My Profile</a>
                </MenuItem>
                <MenuItem v-slot="{active, disabled}" disabled>
                  <a href="#" :class="{'bg-gray-100': active, 'opacity-40': disabled}" class="block py-2 px-4 text-sm text-gray-700">Settings</a>
                </MenuItem>
                <MenuItem v-slot="{active}">
                  <a href="#" :class="{'bg-gray-100': active}" class="block py-2 px-4 text-sm text-gray-700">Help</a>
                </MenuItem>
                <MenuItem v-slot="{active}">
                  <a href="#" :class="{'bg-gray-100': active}" class="block py-2 px-4 text-sm text-gray-700">Log out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
  
        <main>Main content</main>
      </div>
    </div>
  </template>
  
  <script>
  import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue';
  import {CalendarIcon, ChatIcon, ClipboardListIcon, ClockIcon, HeartIcon, HomeIcon, SearchIcon} from '@heroicons/vue/outline';
  import ApplicationLogo from '../components/icons/IconCommunity.vue';
  
  export default {
    components: {ChatIcon, HeartIcon, HomeIcon, Menu, MenuButton, MenuItems, MenuItem, SearchIcon, ApplicationLogo},
    data() {
      return {
        mainNavigation: [
          {href: '/', label: 'INICIO', icon: HomeIcon},
          {href: '/', label: 'PERFIL', icon: HeartIcon},
          {href: '/', label: 'USUARIOS', icon: ChatIcon},
          {href: '/', label: 'DATOS USUARIOS', icon: ChatIcon},
          {href: '/', label: 'PROYECTOS', icon: ChatIcon},
          {href: '/', label: 'GESTION DE PROYECTOS', icon: ChatIcon},
        ],
        libraryNavigation: [
          {href: '/', label: 'Favorites', icon: HeartIcon},
          {href: '/', label: 'Watch later', icon: ClockIcon},
          {href: '/', label: 'History', icon: ClipboardListIcon},
          {href: '/', label: 'Scheduled', icon: CalendarIcon},
        ],
        following: [
          {href: '/', label: 'Constantin Druc', imageUrl: 'https://pbs.twimg.com/profile_images/1333896976602193922/MtWztkxt_400x400.jpg'},
        ],
      };
    },
  };
  </script>