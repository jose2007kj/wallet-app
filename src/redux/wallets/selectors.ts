import { IReduxState } from '../state';
import { ITransactionState, IAccountState, IWalletState } from './state';
import { Blockchain } from '../../core/blockchain/types';

export const selectCurrentWallet = (state: IReduxState): IWalletState =>
    state.wallets.find(wallet => wallet.id === state.app.currentWalletId);

export const getAccountTransactions = (
    state: IReduxState,
    accountIndex: number,
    blockchain: Blockchain
): ITransactionState[] => {
    const account = selectCurrentWallet(state).accounts.filter(
        acc => acc.index === accountIndex && acc.blockchain === blockchain
    )[0];
    const transactions = selectCurrentWallet(state).transactions;
    if (transactions) {
        return Object.values(selectCurrentWallet(state).transactions).filter(
            tx => tx.fromAddress === account.address
        );
    }
};

export const getAccounts = (state: IReduxState, blockchain: Blockchain): IAccountState[] => {
    return selectCurrentWallet(state).accounts.filter(acc => acc.blockchain === blockchain);
};

export const getAccount = (
    state: IReduxState,
    accountIndex: number,
    blockchain: Blockchain
): IAccountState => {
    return selectCurrentWallet(state).accounts.filter(
        acc => acc.index === accountIndex && acc.blockchain === blockchain
    )[0];
};
