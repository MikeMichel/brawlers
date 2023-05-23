<script setup>
// add the default layout
// layout: 'default'
const { data: brawlers } = await useFetch('https://api.brawlapi.com/v1/brawlers');
// funktioniert
const search = ref('')
const searchResults = computed(() => {
  return brawlers.value.list.filter((brawler) => {
    return brawler.name.toLowerCase().includes(search.value.toLowerCase())
  })
})

// create a constant with all possible raritys
const rarity_items = [
  'All',
  'Common',
  'Rare',
  'Super Rare',
  'Epic',
  'Mythic',
  'Legendary'
]

// computed property to filter the brawlers by rarity,name and rarity
const rarity = ref('All')
const filteredBrawlers = computed(() => {
  console.log('search: ', search.value)
  console.log('rarity: ', rarity.value)
  console.log('brawlers: ', brawlers.value)
  const filtered = brawlers.value.list.filter((brawler) => {
    console.log('brawler: ', brawler)
    const result = (rarity.value === 'All' || brawler.rarity.name === rarity.value) && brawler.name.toLowerCase().includes(search.value.toLowerCase())
    console.log('result: ', result)
    return result
  })
  console.log('filtered: ', filtered)
  return filtered
})
</script>

<template>
  <div class="text-center py-10 md:max-w-xl md:mx-auto">
    <h1 class="text-3xl mb-3 mt-2 font-semibold tracking-normal text-gray-800">
      Brawlers
    </h1>
    <h2 class="text-lg mb-8 font-normal text-gray-600 dark:text-gray-400">
      Yay, all brawlers from Brawl Stars!
    </h2>
  </div>


  <div class="p-4 xl:p-0">
    <input
      v-model="search"
      small="true"
      type="text"
      placeholder="Search brawlers..."
      class="w-1/2 px-4 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
    />
    <select v-model="rarity" class="w-1/2 px-4 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline">
      <option v-for="item in rarity_items" :key="item" :value="item">{{ item }}</option>
    </select>
  </div>
  
  <!-- <div class="columns-2 md:columns-2 lg:columns-3 gap-4 space-y-4 "> -->
  <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <NuxtLink v-for="brawler in filteredBrawlers" :key="brawler.id"
      class="bg-white flex flex-col rounded-lg transition duration-300"
      :to="`/brawlers/${brawler.id}`"
      :title="brawler.name"
    >
    <div class="card h-min w-full bg-base-100 shadow-xl">
    <!-- <div class="card w-96 bg-base-100 shadow-xl"> -->
    <figure><img :src="brawler.imageUrl" .alt="brawler.name" /></figure>
    <div class="card-body">
      <h2 class="card-title">{{ brawler.name }}      </h2>
      <h4 class="badge md:badge-md badge-secondary">{{brawler.rarity.name}}</h4>
      <h4 class="badge badge-primary">{{brawler.class.name}}</h4>
      <p class="line-clamp-2">{{ brawler.description }}</p>
      <!-- <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div> -->
    </div>
  </div>
    </NuxtLink>
  </div>
</template>

