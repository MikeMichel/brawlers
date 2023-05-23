<script setup>
// add the default layout
// layout: 'default'
const { data: maps } = await useFetch('https://api.brawlapi.com/v1/maps');
// funktioniert
const search = ref('')
const searchResults = computed(() => {
  return maps.value.list.filter((map) => {
    return maps.name.toLowerCase().includes(search.value.toLowerCase())
  })
})
</script>

<template>
maps
</template>

