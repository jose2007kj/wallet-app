import { WalletType } from '../../core/wallet/types';
import { Blockchain, IBlockchainTransaction } from '../../core/blockchain/types';
import { HWVendor, HWModel, HWConnection } from '../../core/wallet/hw-wallet/types';
import { ITokenConfig } from '../../core/blockchain/types/token';

export interface IWalletsState {
    [id: string]: IWalletState;
}

export interface IWalletState {
    id: string;
    name: string;
    deviceId?: string;
    selected: boolean;
    selectedBlockchain: Blockchain;
    hwOptions?: {
        deviceId: string;
        deviceVendor: HWVendor;
        deviceModel: HWModel;
        connectionType: HWConnection;
    };
    type: WalletType;
    accounts: IAccountState[];
    transactions?: {
        [id: string]: IBlockchainTransaction;
    };
}

export interface IAccountState {
    index: number;
    selected: boolean;
    name?: string;
    blockchain: Blockchain;
    address: string;
    publicKey: string;
    nonce?: number;
    tokens: {
        [symbol: string]: ITokenConfig;
    };
}
