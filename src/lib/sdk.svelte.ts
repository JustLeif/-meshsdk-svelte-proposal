import type * as MeshSdk from '@meshsdk/core';

let meshSdk: typeof MeshSdk | undefined = $state();
let walletList: MeshSdk.Wallet[] = $state([]);

export const MeshSdkState = {
	async loadMeshSdk() {
		import('@meshsdk/core').then((s) => {
			meshSdk = s;
			meshSdk.BrowserWallet.getAvailableWallets().then((wallets) => (walletList = wallets));
		});
	},
	get meshSdk() {
		return meshSdk;
	},
	get walletList() {
		return walletList;
	}
};
