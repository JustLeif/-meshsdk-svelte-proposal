import { type BrowserWallet, type Wallet } from '@meshsdk/core';
import { MeshSdkState } from '$lib/sdk.svelte.js';

let wallet: BrowserWallet | undefined = $state();
let walletName: string | undefined = $state();

export const BrowserWalletState = {
	get wallet() {
		return wallet;
	},
	get walletName() {
		return walletName;
	},
	async connectWallet(w: Wallet) {
		if (MeshSdkState.meshSdk) {
			wallet = await MeshSdkState.meshSdk.BrowserWallet.enable(w.id);
			walletName = w.name
				.split(' ')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
				.join(' ');
		} else {
			throw Error('Mesh SDK is undefined. Wait until it is loaded.');
		}
	},
	disconnectWallet() {
		wallet = undefined;
		walletName = undefined;
	}
};
