<script lang="ts">
	import ConnectWallet from '$lib/connect-wallet.svelte';
	import { MeshSdkState } from '$lib/index.js';
	import { onMount } from 'svelte';

	const { loadMeshSdk } = MeshSdkState;

	// The bundled MeshSdk is around 2mb, it's better that we only fetch the SDK upon page load.
	onMount(() => {
		loadMeshSdk()
			.then()
			.catch((e) => console.error('error loading mesh:', e));
	});
</script>

<ConnectWallet></ConnectWallet>
