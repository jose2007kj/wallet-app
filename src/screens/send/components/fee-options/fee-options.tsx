import React from 'react';
import { IAccountState } from '../../../../redux/wallets/state';
import stylesProvider from './styles';
import { Text } from '../../../../library';
import { withTheme, IThemeProps } from '../../../../core/theme/with-theme';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { translate } from '../../../../core/i18n';
import { GasFeeAvanced } from '../gas-fee-advanced/gas-fee-advanced';
import { FeeTotal } from '../fee-total/fee-total';
import { FeePreset } from '../fee-preset/fee-preset';
import { IBlockchainConfig, IFeeOptions, ChainIdType } from '../../../../core/blockchain/types';
import { getBlockchain } from '../../../../core/blockchain/blockchain-factory';
import BigNumber from 'bignumber.js';
import { IReduxState } from '../../../../redux/state';
import { getChainId } from '../../../../redux/preferences/selectors';
import { smartConnect } from '../../../../core/utils/smart-connect';
import { connect } from 'react-redux';
import bind from 'bind-decorator';
import { ITokenConfig } from '../../../../core/blockchain/types/token';

export interface IExternalProps {
    token: ITokenConfig;
    sendingToken: ITokenConfig;
    account: IAccountState;
    toAddress: string;
    onFeesChanged: (feeOptions: IFeeOptions) => any;
}

interface IState {
    feeOptions: IFeeOptions;
    blockchainConfig: IBlockchainConfig;
    hasAdvancedOptions: boolean;
    selectedPreset: string;
    showAdvancedOptions: boolean;
}

interface IReduxProps {
    chainId: ChainIdType;
}

export class FeeOptionsComponent extends React.Component<
    IExternalProps & IThemeProps<ReturnType<typeof stylesProvider>> & IReduxProps,
    IState
> {
    constructor(
        props: IExternalProps & IThemeProps<ReturnType<typeof stylesProvider>> & IReduxProps
    ) {
        super(props);
        const feeOptions = getBlockchain(this.props.account.blockchain).config.feeOptions;

        this.state = {
            feeOptions: undefined,
            blockchainConfig: getBlockchain(props.account.blockchain).config,
            showAdvancedOptions: false,
            hasAdvancedOptions: !!feeOptions.ui.feeComponentAdvanced,
            selectedPreset: feeOptions.ui.defaultPreset
        };
        this.getEstimatedFees();
    }

    public async getEstimatedFees() {
        const blockchainInstance = getBlockchain(this.props.account.blockchain);
        const fees = await blockchainInstance
            .getClient(this.props.chainId)
            .calculateFees(
                this.props.account.address,
                this.props.toAddress,
                1,
                this.props.sendingToken.contractAddress
            );

        this.setState({
            feeOptions: fees
        });
        this.props.onFeesChanged(fees);
    }

    @bind
    public onSelectFeePreset(key: string) {
        const gasPrice = new BigNumber(this.state.feeOptions.presets[key]);
        const gasLimit = new BigNumber(this.state.feeOptions.gasLimit);

        this.setState({
            selectedPreset: key,
            feeOptions: {
                ...this.state.feeOptions,
                gasPrice: gasPrice.toString(),
                gasLimit: gasLimit.toString(),
                feeTotal: gasPrice.multipliedBy(gasLimit).toString()
            }
        });
        this.props.onFeesChanged({
            gasPrice: gasPrice.toString(),
            gasLimit: gasLimit.toString(),
            feeTotal: gasPrice.multipliedBy(gasLimit).toString()
        });
    }

    @bind
    public onInputAdvancedFees(gasPrice: string, gasLimit: string, feeTotal: string) {
        const feeOptions: IFeeOptions = {
            gasPrice,
            gasLimit,
            feeTotal
        };
        this.setState({
            feeOptions
        });
        this.props.onFeesChanged(feeOptions);
    }

    @bind
    public onAdvancedButton() {
        const currentState = this.state.showAdvancedOptions;
        this.setState({
            showAdvancedOptions: !currentState
        });
    }

    public renderSimpleFees() {
        const styles = this.props.styles;
        switch (this.state.blockchainConfig.feeOptions.ui.feeComponent) {
            case 'FeeTotal':
                return (
                    this.state.feeOptions && (
                        <FeeTotal
                            amount={this.state.feeOptions.feeTotal}
                            blockchain={this.props.account.blockchain}
                            token={this.props.token}
                        />
                    )
                );
            case 'FeePresets': {
                return (
                    this.state.feeOptions && (
                        <View style={styles.containerPresets}>
                            <FlatList
                                contentContainerStyle={styles.list}
                                onEndReachedThreshold={0.5}
                                numColumns={2}
                                scrollEnabled={false}
                                data={Object.keys(this.state.feeOptions.presets)}
                                keyExtractor={index => `${index}`}
                                renderItem={({ item }) => (
                                    <FeePreset
                                        key={item}
                                        token={this.props.token}
                                        amount={this.state.feeOptions.presets[item]
                                            .multipliedBy(this.state.feeOptions.gasLimit)
                                            .toString()}
                                        blockchain={this.props.account.blockchain}
                                        title={translate('App.labels.' + item)}
                                        presetKey={item}
                                        onSelect={this.onSelectFeePreset}
                                        selected={this.state.selectedPreset === item}
                                    />
                                )}
                                horizontal={false}
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    )
                );
            }
            default:
                return null;
        }
    }
    public renderAdvancedFees() {
        if (this.state.blockchainConfig.feeOptions.ui.feeComponentAdvanced === 'GasFeeAdvanced') {
            return (
                this.state.feeOptions && (
                    <GasFeeAvanced
                        gasPrice={this.state.feeOptions.gasPrice}
                        gasLimit={this.state.feeOptions.gasLimit}
                        blockchain={this.props.account.blockchain}
                        onInputFees={this.onInputAdvancedFees}
                        token={this.props.token}
                    />
                )
            );
        }
    }

    public render() {
        const styles = this.props.styles;
        return (
            <View style={styles.container}>
                {this.state.showAdvancedOptions
                    ? this.renderAdvancedFees()
                    : this.renderSimpleFees()}
                {this.state.hasAdvancedOptions && (
                    <TouchableOpacity
                        testID="advanced-fees"
                        onPress={this.onAdvancedButton}
                        style={[styles.buttonRightOptions]}
                    >
                        <Text style={styles.textTranferButton}>
                            {this.state.showAdvancedOptions
                                ? translate('App.labels.simpleSetup')
                                : translate('App.labels.advancedSetup')}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    }
}

export const mapStateToProps = (state: IReduxState, ownProps: IExternalProps) => {
    return {
        chainId: getChainId(state, ownProps.account.blockchain)
    };
};

export const FeeOptions = smartConnect<IExternalProps>(FeeOptionsComponent, [
    connect(mapStateToProps, null),
    withTheme(stylesProvider)
]);
