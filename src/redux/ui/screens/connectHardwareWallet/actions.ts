// actions consts
export const VERIFY_ADDRESS_ON_DEVICE = 'VERIFY_ADDRESS_ON_DEVICE';
export const FEATURE_NOT_SUPPORTED = 'FEATURE_NOT_SUPPORTED';
export const TO_INITIAL_STATE = 'TO_INITIAL_STATE';
export const CONNECT_IN_PROGRESS = 'CONNECT_IN_PROGRESS';

// actions creators
export const verifyAddressOnDevice = (verify: boolean) => {
    return {
        type: VERIFY_ADDRESS_ON_DEVICE,
        data: verify
    };
};

export const featureNotSupported = () => {
    return {
        type: FEATURE_NOT_SUPPORTED
    };
};
export const connectInProgress = () => {
    return {
        type: CONNECT_IN_PROGRESS
    };
};

export const toInitialState = () => {
    return {
        type: TO_INITIAL_STATE
    };
};
