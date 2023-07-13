<script setup>
import gsap from "gsap";
// add the default layout
// layout: 'default'
const { data: maps } = await useFetch('https://api.brawlapi.com/v1/maps');
// funktioniert
const search = ref('')
const searchResults = computed(() => {
  return maps.value.list.filter((map) => {
    return map.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

const map_types = [
  'All',
  'Gem Grab',
  'Brawl Ball',
  'Showdown',
  'Bounty',
  'Heist',
  'Siege',
  'Hot Zone',
  'Knockout',
  'Power Play',
  'Big Game',
  'Robo Rumble',
  'Boss Fight',
  'Championship Challenge',
  'Special Events',
  'Training Cave',
  'Map Maker'
]

// computed property to filter the maps by map_type,name and map_type
const type = ref('All')
const filteredMaps = computed(() => {
  console.log('search: ', search.value)
  console.log('map_type: ', type.value)
  console.log('maps: ', maps.value)
  const filtered = maps.value.list.filter((map) => {
    console.log('map: ', map)
    const result = (type.value === 'All' || map.gameMode.name === type.value) && map.name.toLowerCase().includes(search.value.toLowerCase())
    console.log('result: ', result)
    return result
  })
  console.log('filtered: ', filtered)
  return filtered
})

// create a constant which watches and takes the length of the filtered brawlers and animate it with gsap
const animatedValue = ref(filteredMaps.value.length); // filteredBrawlers.value.length is the initial value
watch(filteredMaps, () => {
  gsap.to(animatedValue, {
    duration: 1,
    value: filteredMaps.value.length,
    // no decimals
    roundProps: "value",
  });
});
</script>

<template>
  <div class="text-center py-10 md:max-w-xl md:mx-auto">
    <h1 class="text-3xl mb-3 mt-2 font-semibold tracking-normal text-gray-800">
      {{ animatedValue}} Maps
    </h1>
    <h2 class="text-lg mb-8 font-normal text-gray-600 dark:text-gray-400">
      Yay, all maps from Brawl Stars!
    </h2>
  </div>

<div class="p-4 xl:p-0">
  <input
    v-model="search"
    small="true"
    type="text"
    placeholder="Search maps..."
    class="w-1/2 px-4 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
  />
  <select v-model="type" class="w-1/2 px-4 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline">
    <option v-for="item in map_types" :key="item" :value="item">
      {{ item }}
    </option>
  </select>
</div>

<div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <NuxtLink v-for="map in filteredMaps" :key="map.id"
      class="bg-white flex flex-col rounded-lg transition duration-300"
      :to="`/maps/${map.id}`"
      :title="map.name"
    >
    <div class="card h-min w-full bg-base-100 shadow-xl">
    <!-- <div class="card w-96 bg-base-100 shadow-xl"> -->
    <figure><img :src="map.imageUrl" .alt="map.name" /></figure>
    <div class="card-body">
      <h2 class="card-title">{{ map.name }}</h2>
      <h4 class="badge md:badge-md badge-secondary">{{map.gameMode.name}}</h4>
    </div>
  </div>
    </NuxtLink>
  </div>
</template>
