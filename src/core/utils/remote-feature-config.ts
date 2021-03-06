import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';

export enum RemoteFeature {
    NEAR = 'feature_near',
    COSMOS = 'feature_cosmos',
    DEV_TOOLS = 'dev_tools',
    TC_VERSION = 'tcVersion'
}

let featuresConfig;

export const getRemoteConfigFeatures = async () => {
    // TODO: decide if 15 min should be the optimal fetch duration
    // set fetch cache duration to 15 min for live environment
    // TODO - before launch set duration back to 15 minutes
    let duration = 0;
    if (__DEV__) {
        firebase.config().enableDeveloperMode();
        duration = 0;
    }

    await firebase.config().fetch(duration);
    await firebase.config().activateFetched();
    const objects = await firebase
        .config()
        .getValues([
            RemoteFeature.NEAR,
            RemoteFeature.COSMOS,
            RemoteFeature.DEV_TOOLS,
            RemoteFeature.TC_VERSION
        ]);

    featuresConfig = {};
    // Retrieve values
    Object.keys(objects).forEach(key => {
        featuresConfig[key] = objects[key].val();
    });

    return featuresConfig;
};

export const isFeatureActive = (feature: RemoteFeature): boolean => {
    if (__DEV__) {
        return true;
    }
    if (
        (feature === RemoteFeature.NEAR ||
            feature === RemoteFeature.COSMOS ||
            feature === RemoteFeature.DEV_TOOLS) &&
        featuresConfig
    ) {
        const values = JSON.parse(featuresConfig[feature]);
        if (values.length > 0) {
            const uniqueId = values.filter(id => id === DeviceInfo.getUniqueId());
            if (uniqueId.length) {
                return true;
            }
        }
    }
    return false;
};

export const getFirebaseTCVersion = async (): Promise<number> => {
    if (featuresConfig) {
        const tcVersion = JSON.parse(featuresConfig[RemoteFeature.TC_VERSION]);

        if (tcVersion) {
            await AsyncStorage.setItem('tcAcceptedVersion', String(tcVersion));
        }

        return tcVersion;
    }

    return;
};
