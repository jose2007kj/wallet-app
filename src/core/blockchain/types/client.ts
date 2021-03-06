import BigNumber from 'bignumber.js';
import { IBlockchainNetwork, ChainIdType } from './network';
import { IFeeOptions, IBlockchainTransaction } from './transaction';
import { IBlockchainNameService } from '.';
import { HttpClient } from '../../utils/http-client';

export interface IBlockInfo {
    number: number;
    hash?: string;
}

export abstract class BlockchainGenericClient {
    public readonly tokens: { [type: string]: any } = {};
    public nameService: IBlockchainNameService;
    public http: HttpClient;
    public readonly chainId: ChainIdType;

    constructor(chainId: ChainIdType, networks: IBlockchainNetwork[]) {
        let url = networks[0].url;
        const network = networks.filter(n => n.chainId === chainId)[0];
        if (network) {
            url = network.url;
        }

        this.chainId = chainId;
        this.http = new HttpClient(url);
    }

    public abstract getBalance(address: string): Promise<BigNumber>;
    public abstract getNonce(address: string, publicKey?: string): Promise<number>;
    public abstract getCurrentBlock(): Promise<IBlockInfo>;
    public abstract getTransactionInfo(transactionHash: string[]): Promise<IBlockchainTransaction>;

    public abstract sendTransaction(transaction: any): Promise<string>;

    public abstract calculateFees(
        from: string,
        to: string,
        amount?,
        contractAddress?
    ): Promise<IFeeOptions>;
}
