import reducer from '../reducer';
import { WALLET_ADD, SELECT_WALLET } from '../actions';

jest.mock('../../config');

describe('wallets reducer', () => {
    test('should set initial state', () => {
        expect(
            reducer(undefined as any, {
                type: '',
                data: ''
            })
        ).toMatchSnapshot();
    });

    test('should handle WALLET_ADD', () => {
        expect(
            reducer(undefined as any, {
                type: WALLET_ADD,
                data: { id: 'walletId' }
            })
        ).toEqual({ walletId: { id: 'walletId' } });
    });
});
