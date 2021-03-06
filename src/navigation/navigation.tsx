import React from 'react';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';

import { darkTheme } from '../styles/themes/dark-theme';
import { lightTheme } from '../styles/themes/light-theme';
import { ITheme } from '../core/theme/itheme';
import { Theme } from '../core/theme/themes';
import { HeaderLeft } from '../components/header-left/header-left';
import { menuIcon } from './utils';

import { DashboardScreen } from '../screens/dashboard/dashboard';
import { SettingsScreen } from '../screens/settings/settings';
import { NetworkOptionsScreen } from '../screens/settings/network-options/network-options';
import { NetworkSelectionScreen } from '../screens/settings/network-selection/network-selection';
import { SetCurrencyScreen } from '../screens/settings/set-currency/set-currency';
import { BlockchainPortfolioScreen } from '../screens/settings/blockchain-portfolio/blockchain-portfolio';
import { BackupWalletScreen } from '../screens/settings/backup-wallet/backup-wallet';
import { OnboardingScreen } from '../screens/onboarding/onboarding';
import { CreateWalletMnemonicScreen } from '../screens/create-wallet-mnemonic/create-wallet-mnemonic';
import { TokenScreen } from '../screens/token/token';
import { SendScreen } from '../screens/send/send';
import { TermsConditionsScreen } from '../screens/terms-conditions/terms-conditions';
import { PrivacyPolicyScreen } from '../screens/privacy-policy/privacy-policy';
import { CreateWalletConfirmMnemonicScreen } from '../screens/create-wallet-confirm-mnemonic/create-wallet-confirm-mnemonic';
import { RecoverWalletScreen } from '../screens/recover-wallet/recover-wallet';
import { WalletsScreen } from '../screens/wallets/wallets';
import { ReceiveScreen } from '../screens/receive/receive';
import { ViewWalletMnemonicScreen } from '../screens/view-wallet-mnemonic/view-wallet-mnemonic';
import { TransactionsHistoryScreen } from '../screens/transactions-history/transactions-history';
import { TransactionDetails } from '../screens/transaction-details/transaction-details';
import { StatisticsScreen } from '../screens/statistics/statistics';
import { WatchScreen } from '../screens/watch/watch';
import { ManageAccountScreen } from '../screens/manage-account/manage-account';
import { BASE_DIMENSION } from '../styles/dimensions';
import { ConnectHardwareWallet } from '../screens/connect-hardware-wallet/connect-hardware-wallet';
import { ManageTokenScreen } from '../screens/manage-token/manage-token';

interface IDefaultNavOptions {
    navigation: any;
    theme: Theme;
}

export const themes: { dark: ITheme; light: ITheme } = {
    [Theme.dark]: darkTheme,
    [Theme.light]: lightTheme
};

const mainTabbedNavigationOptions: any = {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showIcon: true,
        labelStyle: {
            fontSize: 12,
            lineHeight: 15,
            fontWeight: '500',
            letterSpacing: 0.3
        },
        style: {
            padding: BASE_DIMENSION,
            height: 60
        },
        indicatorStyle: {
            display: 'none'
        },
        activeTintColor: {
            dark: darkTheme.colors.accent
        },
        inactiveTintColor: {
            dark: darkTheme.colors.textSecondary
        }
    },

    swipeEnabled: false
};

export const defaultStackNavigationOptions: any = ({ navigation, theme }: IDefaultNavOptions) => ({
    headerStyle: {
        backgroundColor: themes[theme].colors.appBackground,
        elevation: 0,
        borderBottomWidth: 0
    },
    headerTitleStyle: {
        flex: 1,
        fontSize: 22,
        lineHeight: 28,
        color: themes[theme].colors.text,
        letterSpacing: 0.38,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    headerLeft: navigation.dangerouslyGetParent().state.index > 0 && (
        <HeaderLeft icon="arrow-left-1" onPress={() => navigation.goBack(null)} />
    )
});

// wallet navigation stack
export const WalletNavigation = createStackNavigator(
    {
        Dashboard: {
            screen: DashboardScreen
        },
        Token: {
            screen: TokenScreen
        },
        Send: {
            screen: SendScreen
        },
        Receive: {
            screen: ReceiveScreen
        },
        Wallets: {
            screen: WalletsScreen
        },
        ViewWalletMnemonic: {
            screen: ViewWalletMnemonicScreen
        },
        TransactonsHistory: {
            screen: TransactionsHistoryScreen
        },
        TransactionDetails: {
            screen: TransactionDetails
        },
        ManageAccount: {
            screen: ManageAccountScreen
        },
        ManageToken: {
            screen: ManageTokenScreen
        }
    },
    {
        initialRouteName: 'Dashboard',
        defaultNavigationOptions: defaultStackNavigationOptions,
        headerLayoutPreset: 'center',
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: navigation.state.index < 1
        })
    }
);

// settings navigation stack
export const SettingsNavigation = createStackNavigator(
    {
        Settings: {
            screen: SettingsScreen
        },
        NetworkOptions: {
            screen: NetworkOptionsScreen
        },
        NetworkSelection: {
            screen: NetworkSelectionScreen
        },
        TermsConditions: {
            screen: TermsConditionsScreen
        },
        PrivacyPolicy: {
            screen: PrivacyPolicyScreen
        },
        Wallets: {
            screen: WalletsScreen
        },
        ViewWalletMnemonic: {
            screen: ViewWalletMnemonicScreen
        },
        SetCurrency: {
            screen: SetCurrencyScreen
        },
        BlockchainPortfolio: {
            screen: BlockchainPortfolioScreen
        },
        BackupWallet: {
            screen: BackupWalletScreen
        }
    },
    {
        initialRouteName: 'Settings',
        defaultNavigationOptions: defaultStackNavigationOptions,
        headerLayoutPreset: 'center',
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: navigation.state.index < 1
        })
    }
);

// rewards navigation stack
export const StatisticsNavigation = createStackNavigator(
    {
        Statistics: {
            screen: StatisticsScreen
        }
    },
    {
        initialRouteName: 'Statistics',
        defaultNavigationOptions: defaultStackNavigationOptions,
        headerLayoutPreset: 'center'
    }
);

// watch navigation stack
export const WatchNavigation = createStackNavigator(
    {
        Watch: {
            screen: WatchScreen
        }
    },
    {
        initialRouteName: 'Watch',
        defaultNavigationOptions: defaultStackNavigationOptions,
        headerLayoutPreset: 'center'
    }
);

// main dashboard navigation
export const navigationConfig = {
    Dashboard: {
        screen: WalletNavigation,
        navigationOptions: () => ({
            tabBarIcon: menuIcon('dashboard')
        })
    },
    Statistics: {
        screen: StatisticsNavigation,
        headerTransparent: true,
        navigationOptions: () => ({
            tabBarIcon: menuIcon('performance-money-increase')
        })
    },
    Watch: {
        screen: WatchNavigation,
        headerTransparent: true,
        navigationOptions: () => ({
            tabBarIcon: menuIcon('view-1')
        })
    },
    Settings: {
        screen: SettingsNavigation,
        headerTransparent: true,
        navigationOptions: () => ({
            tabBarIcon: menuIcon('cog')
        })
    }
};

// wallet creation flow stack
export const CreateWalletNavigation = createStackNavigator(
    {
        CreateWalletMnemonic: {
            screen: CreateWalletMnemonicScreen
        },
        TermsConditions: {
            screen: TermsConditionsScreen
        },
        PrivacyPolicy: {
            screen: PrivacyPolicyScreen
        },
        CreateWalletConfirmMnemonic: {
            screen: CreateWalletConfirmMnemonicScreen
        },
        RecoverWallet: {
            screen: RecoverWalletScreen
        },
        ConnectHardwareWallet: {
            screen: ConnectHardwareWallet
        }
    },
    {
        initialRouteName: 'CreateWalletMnemonic',
        defaultNavigationOptions: defaultStackNavigationOptions
    }
);

// main bottom bar navigation
export const MainNavigation = createBottomTabNavigator(
    navigationConfig,
    mainTabbedNavigationOptions
);

export const RootNavigation = createSwitchNavigator(
    {
        OnboardingScreen,
        MainNavigation,
        CreateWalletNavigation
    },
    {
        initialRouteName: 'MainNavigation'
    }
);
