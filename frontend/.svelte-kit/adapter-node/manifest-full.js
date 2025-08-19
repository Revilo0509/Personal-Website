export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.DNzmfvB6.js",app:"_app/immutable/entry/app.BJgQ_E_i.js",imports:["_app/immutable/entry/start.DNzmfvB6.js","_app/immutable/chunks/e0xQiYhl.js","_app/immutable/chunks/BWs6O1t_.js","_app/immutable/entry/app.BJgQ_E_i.js","_app/immutable/chunks/BWs6O1t_.js","_app/immutable/chunks/e0xQiYhl.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/I41wo5Jb.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
