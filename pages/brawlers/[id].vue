<script setup lang="ts">
import type { Brawler } from '~~/types'

const route = useRoute()
console.log(route.params)
const { data: brawler, pending, error } = await useFetch<Brawler>(`https://api.brawlapi.com/v1/brawlers/${route.params.id}`)

useHead({
	title: `${brawler.value?.title} | Blog`,
})
</script>

<template>
	<section class="dark:bg-gray-800 dark:text-gray-100">
		<div class="container flex flex-col-reverse mx-auto lg:flex-row">
			<div
				class="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5 dark:bg-violet-400 dark:text-gray-900">
				<div class="flex space-x-2 sm:space-x-4">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						class="flex-shrink-0 w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z">
						</path>
					</svg>
					<div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						Loading ...
					</div>
					<div v-else-if="error">
						{{ error }}
					</div>
					<div class="space-y-2">
						<p class="text-lg font-medium leading-snug"> {{ brawler.name }}</p>
						<p class="leading-snug">{{ brawler.description }}</p>
					</div>
				</div>
			</div>

			<div class="relative" style="padding-top: 56.25%">
			</div>

			<div class="lg:w-1/2 xl:w-3/5 dark:bg-gray-800">
				<div class="flex items-center justify-center p-4 md:p-8 lg:p-12">
					<img :src="brawler.imageUrl" .alt="brawler.name"
						class="rounded-lg shadow-lg dark:bg-gray-500">
				</div>
			</div>
	</div>
</section></template>
