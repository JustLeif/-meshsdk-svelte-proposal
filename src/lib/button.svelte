<script lang="ts">
	import { type Snippet } from 'svelte';
	const {
		onmouseleave,
		onmouseenter,
		children,
		isDarkMode,
		hideMenuList,
		setHideMenuList
	}: {
		children?: Snippet;
		isDarkMode?: boolean;
		hideMenuList?: boolean;
		setHideMenuList?: (hideMenuList: boolean) => void;
		onmouseenter?: () => void;
		onmouseleave?: () => void;
	} = $props();
</script>

<button
	class={`mesh-mr-menu-list mesh-flex mesh-w-60 mesh-items-center mesh-justify-center mesh-rounded-t-md mesh-border mesh-px-4 mesh-py-2 mesh-text-lg mesh-font-normal mesh-shadow-sm ${isDarkMode ? `mesh-bg-neutral-950 mesh-text-neutral-50` : `mesh-bg-neutral-50 mesh-text-neutral-950`}`}
	onclick={() => setHideMenuList && setHideMenuList(!hideMenuList)}
	{onmouseenter}
	{onmouseleave}
>
	{children}
</button>
