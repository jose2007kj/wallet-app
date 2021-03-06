import { Blockchain } from '../blockchain/types';
import { getBlockchain } from '../blockchain/blockchain-factory';

export const formatAddress = (text: string, blockchain: Blockchain) => {
    switch (getBlockchain(blockchain).config.ui.addressDisplay) {
        case 'stripped':
            if (text.length === 0) {
                return '';
            }
            let convertedStr = '';
            convertedStr += text.substring(0, 5);
            convertedStr += '.'.repeat(3);
            convertedStr += text.substring(text.length - 5, text.length);
            return convertedStr;
        default:
            return text;
    }
};
