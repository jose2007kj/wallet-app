import React from 'react';
import { View } from 'react-native';
import { withTheme, IThemeProps } from '../../core/theme/with-theme';
import stylesProvider from './styles';
import { smartConnect } from '../../core/utils/smart-connect';
import { Text } from '../../library';
import { connect } from 'react-redux';
import { Blockchain } from '../../core/blockchain/types';
import { getSelectedBlockchain } from '../../redux/wallets/selectors';
import { IReduxState } from '../../redux/state';
import { getNetworkName } from '../../redux/preferences/selectors';
import { translate } from '../../core/i18n';
import { getBlockchain } from '../../core/blockchain/blockchain-factory';

export interface IReduxProps {
    blockchain: Blockchain;
    networkName: string;
    testNet: boolean;
}

const mapStateToProps = (state: IReduxState) => {
    const blockchain = getSelectedBlockchain(state) as Blockchain;

    return {
        blockchain,
        networkName: getNetworkName(state, blockchain),
        testNet: state.preferences.testNet
    };
};

export class TestnetBadgeComponent extends React.Component<
    IReduxProps & IThemeProps<ReturnType<typeof stylesProvider>>
> {
    public render() {
        const styles = this.props.styles;
        const config = getBlockchain(this.props.blockchain).config;
        const blockchain = config.tokens[config.coin].name;

        if (this.props.testNet) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>
                        {translate('App.labels.youAreOn', {
                            blockchain,
                            networkName: this.props.networkName
                        })}
                    </Text>
                </View>
            );
        } else {
            return <View />;
        }
    }
}

export const TestnetBadge = smartConnect(TestnetBadgeComponent, [
    connect(mapStateToProps, null),
    withTheme(stylesProvider)
]);