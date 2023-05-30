<script setup lang="ts">
import { Maps } from '~~/types'

const route = useRoute()
console.log(route.params)
const { data: map, pending, error } = await useFetch<Maps>(`https://api.brawlapi.com/v1/maps/${route.params.id}`)

useHead({
	title: `${map.value?.title} | Maps`,
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
						<p class="text-lg font-medium leading-snug"> {{ map.name }}</p>
						<p class="leading-snug">{{ map.description }}</p>
					</div>
				</div>
			</div>
			<div class="lg:w-1/2 xl:w-3/5 dark:bg-gray-800">
				<div class="flex items-center justify-center p-4 md:p-8 lg:p-12">
					<img :src="map.imageUrl" .alt="map.name"
						class="rounded-lg shadow-lg dark:bg-gray-500">
				</div>
			</div>
		</div>
	</section>
	<section>
		<div class="overflow-x-auto w-full">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" class="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr v-for="best in map.stats" :key="map.stats.brawler">
        <td>
          <div class="flex items-center space-x-3">
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div class="font-bold">{{ best.brawler }}</div>
              <!-- <div class="text-sm opacity-50">{{ brawlers.id[0].name }}</div> -->

            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br/>
          <span class="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Purple</td>
        <th>
          <button class="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>
  </table>
</div>
	</section>
</template>
