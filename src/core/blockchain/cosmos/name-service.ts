import {
    IResolveTextResponse,
    IResolveNameResponse,
    ResolveTextType,
    ResolveTextCode,
    ResolveTextError
} from '../types';
import { isValidAddress, isValidChecksumAddress } from './account';
import { IBlockchainNameService } from '../types/name-service';

export class NameService implements IBlockchainNameService {
    public resolveText(text: string): Promise<IResolveTextResponse> {
        const validAddress = isValidAddress(text);
        const validChecksumAddress = isValidChecksumAddress(text);

        if (validAddress) {
            return Promise.resolve({
                code: validChecksumAddress ? ResolveTextCode.OK : ResolveTextCode.WARN_CHECKSUM,
                type: ResolveTextType.ADDRESS,
                address: text,
                name: ''
            });
        } else {
            return Promise.reject({
                error: ResolveTextError.INVALID
            });
        }
    }

    public resolveName(text: string): Promise<IResolveNameResponse> {
        return Promise.resolve({
            address: text
        });
    }
}
