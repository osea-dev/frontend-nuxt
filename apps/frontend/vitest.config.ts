/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="vitest/globals" />

import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    build: {
		sourcemap: true,
	},

	plugins: [
		AutoImport({
			imports: [
				'pinia',
				'vitest',
				'vue',
				{
					'@/.nuxt/imports': ['defineI18nRoute', 'useNuxtApp', 'useHead'],
				},
			],
		}),

		Components({
			dirs: ['apps/frontend/components'], // Auto-import components from this directory
			extensions: ['vue'], // File extensions to look for
			deep: true, // Recursively search in subdirectories
			dts: 'apps/frontend/components.d.ts', // Generates a TypeScript declaration file for components
		}),

		vue(),
	],

	resolve: {
		alias: {
			'@/': resolve(__dirname, '/'),
		},
	},

	test: {
		environment: 'jsdom',
		exclude: ['node_modules'],
		globals: true,
		setupFiles: './test/test.config.ts',
	},
})
