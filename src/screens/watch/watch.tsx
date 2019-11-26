import React from 'react';
import { View } from 'react-native';
import { Text } from '../../library';
import { withNavigationParams, INavigationProps } from '../../navigation/with-navigation-params';
import { withTheme, IThemeProps } from '../../core/theme/with-theme';
import { IReduxState } from '../../redux/state';
import { translate } from '../../core/i18n';

import stylesProvider from './styles';
import { smartConnect } from '../../core/utils/smart-connect';
import { connect } from 'react-redux';
import { HeaderLeft } from '../../components/header-left/header-left';
import { KeyboardCustom } from '../../components/keyboard-custom/keyboard-custom';

interface IState {
    textInput: any;
}

export const mapStateToProps = (state: IReduxState) => {
    return {};
};

export const navigationOptions = () => ({
    headerLeft: <HeaderLeft icon="saturn-icon" />,
    title: translate('Watch.title')
});

export class WatchScreenComponent extends React.Component<
    INavigationProps & IThemeProps<ReturnType<typeof stylesProvider>>,
    IState
> {
    public static navigationOptions = navigationOptions;

    constructor(props: INavigationProps & IThemeProps<ReturnType<typeof stylesProvider>>) {
        super(props);
        this.state = {
            textInput: ''
        };
    }

    public handleTextUpdate = (text: any) => {
        this.setState({
            textInput: this.state.textInput + text
        });
    };

    public handleDeleteKey = () => {
        this.setState({
            textInput: this.state.textInput.slice(0, -1)
        });
    };

    public render() {
        const styles = this.props.styles;

        return (
            <View style={styles.container}>
                <View style={styles.textInputArea}>
                    <Text style={styles.text}>{this.state.textInput}</Text>
                </View>
                <KeyboardCustom
                    showNumeric={true}
                    handleTextUpdate={this.handleTextUpdate}
                    handleDeleteKey={this.handleDeleteKey}
                />
            </View>
        );
    }
}

export const WatchScreen = smartConnect(WatchScreenComponent, [
    connect(mapStateToProps, null),
    withTheme(stylesProvider),
    withNavigationParams()
]);