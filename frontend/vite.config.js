import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), devtoolsJson()],
	server: {
		host: true,
		allowedHosts: ['dev.revilo0509.net'],
		proxy: {
			'/b/presence': {
				target: 'http://localhost:3005',
				changeOrigin: true,
				ws: true
			}
		}
	}
});
