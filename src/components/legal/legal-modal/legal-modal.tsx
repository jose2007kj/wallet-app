import React from 'react';
import { View } from 'react-native';
import { withTheme, IThemeProps } from '../../../core/theme/with-theme';
import stylesProvider from './styles';
import { smartConnect } from '../../../core/utils/smart-connect';
import { IReduxState } from '../../../redux/state';
import { connect } from 'react-redux';
import Modal from '../../../library/modal/modal';
import { Legal } from '../legal';
import { getFirebaseTCVersion } from '../../../core/utils/remote-feature-config';
import AsyncStorage from '@react-native-community/async-storage';

interface IExternalProps {
    navigationState: any;
}

export interface IReduxProps {
    tcAcceptedVersion: number;
}

const mapStateToProps = (state: IReduxState) => {
    return {
        tcAcceptedVersion: state.app.tcAcceptedVersion
    };
};

interface IState {
    showModal: boolean;
    tcLatestVersion: number;
}

export class LegalModalComponent extends React.Component<
    IReduxProps & IExternalProps & IThemeProps<ReturnType<typeof stylesProvider>>,
    IState
> {
    constructor(
        props: IReduxProps & IExternalProps & IThemeProps<ReturnType<typeof stylesProvider>>
    ) {
        super(props);
        this.state = {
            showModal: false,
            tcLatestVersion: undefined
        };
    }

    public componentDidMount() {
        this.handleShowLegalModal();
    }

    public componentDidUpdate(prevProps: IExternalProps) {
        if (this.props.navigationState !== prevProps.navigationState) {
            this.handleShowLegalModal();
        }
    }

    private handleShowLegalModal = async () => {
        if (this.props.navigationState) {
            const index = this.props.navigationState.index;
            const currentRoute = this.props.navigationState.routes[index].routeName;
            let tcLatestVersion = await getFirebaseTCVersion();

            if (tcLatestVersion === undefined) {
                // check AsyncStorage
                const tcVersionAsyncStorage = await AsyncStorage.getItem('tcAcceptedVersion');
                tcLatestVersion = Number(tcVersionAsyncStorage);
            }

            const showLegalModal =
                currentRoute !== 'OnboardingScreen' &&
                tcLatestVersion !== undefined &&
                (this.props.tcAcceptedVersion === undefined ||
                    tcLatestVersion > this.props.tcAcceptedVersion);

            if (showLegalModal) {
                this.setState({
                    tcLatestVersion,
                    showModal: true
                });
            }
        }
    };

    public render() {
        return (
            <Modal isVisible={this.state.showModal}>
                <View style={this.props.styles.container}>
                    <Legal
                        tcLatestVersion={this.state.tcLatestVersion}
                        onAccept={() => this.setState({ showModal: false })}
                    />
                </View>
            </Modal>
        );
    }
}

export const LegalModal = smartConnect<IExternalProps>(LegalModalComponent, [
    connect(mapStateToProps, null),
    withTheme(stylesProvider)
]);
