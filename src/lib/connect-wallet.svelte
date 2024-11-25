<script lang="ts">
	import { MeshSdkState } from './sdk.svelte.js';
	import { BrowserWalletState } from './browser-wallet-state.svelte.js';

	const {
		label = 'Connect Wallet',
		onConnected = undefined,
		isDark = false,
		metamask = undefined,
		extensions = []
	}: {
		label?: string;
		onConnected?: Function;
		isDark?: boolean;
		metamask?: {
			network: string;
		};
		extensions?: number[];
	} = $props();

	let isDarkMode: boolean = $state(false);
	let hideMenuList: boolean = $state(true);
</script>

<div
	role="button"
	tabindex="0"
	aria-label="Connect Wallet"
	onmouseenter={() => (hideMenuList = false)}
	onmouseleave={() => (hideMenuList = true)}
	class="mesh-z-50 mesh-w-min"
>
	<button
		class={`mesh-mr-menu-list mesh-flex mesh-w-60 mesh-items-center mesh-justify-center mesh-rounded-t-md mesh-border mesh-px-4 mesh-py-2 mesh-text-lg mesh-font-normal mesh-shadow-sm ${isDarkMode ? `mesh-bg-neutral-950 mesh-text-neutral-50` : `mesh-bg-neutral-50 mesh-text-neutral-950`}`}
		onclick={() => (hideMenuList = !hideMenuList)}
	>
		{label}
	</button>
	<div
		class={`mesh-mr-menu-list mesh-absolute mesh-z-50 mesh-w-60 mesh-rounded-b-md mesh-border mesh-text-center mesh-shadow-sm mesh-backdrop-blur ${hideMenuList && 'mesh-hidden'} ${isDarkMode ? `mesh-bg-neutral-950 mesh-text-neutral-50` : `mesh-bg-neutral-50 mesh-text-neutral-950`}`}
	>
		{#if BrowserWalletState.wallet === undefined && MeshSdkState.walletList.length > 0}
			{#each MeshSdkState.walletList as enabledWallet}
				{@render menuItem(
					enabledWallet.icon,
					() => BrowserWalletState.connectWallet(enabledWallet),
					enabledWallet.name
				)}
			{/each}
		{:else if BrowserWalletState.wallet === undefined && MeshSdkState.walletList.length === 0}
			<span>No Wallet Found</span>
		{:else}{/if}
	</div>
</div>
{#snippet menuItem(icon: string, onclick: () => void, name: string)}
	<button
		class="mesh-flex mesh-h-16 mesh-cursor-pointer mesh-items-center mesh-px-4 mesh-py-2 mesh-opacity-80 hover:mesh-opacity-100"
		{onclick}
	>
		{#if icon}
			<img alt={name + ' wallet icon'} class="mesh-m-1 mesh-h-8 mesh-pr-2" src={icon} />
		{/if}
		<span
			class="mesh-mr-menu-item mesh-text-xl mesh-font-normal mesh-text-gray-700 hover:mesh-text-black"
		>
			{name
				.split(' ')
				.map((word: string) => {
					return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
				})
				.join(' ')}
		</span>
	</button>
{/snippet}
