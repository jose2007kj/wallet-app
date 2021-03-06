import { navigationConfig, defaultStackNavigationOptions } from '../navigation';
import { menuIcon } from '../utils';

jest.mock('../utils');

jest.mock('../../redux/config');

export default describe('Navigation', () => {
    describe('configuration', () => {
        test('config is ok', () => {
            navigationConfig.Dashboard.navigationOptions();
            expect(menuIcon).toHaveBeenCalledWith('dashboard');
            (menuIcon as any).mockClear();

            navigationConfig.Watch.navigationOptions();
            expect(menuIcon).toHaveBeenCalledWith('view-1');
            (menuIcon as any).mockClear();

            navigationConfig.Statistics.navigationOptions();
            expect(menuIcon).toHaveBeenCalledWith('performance-money-increase');
            (menuIcon as any).mockClear();

            navigationConfig.Settings.navigationOptions();
            expect(menuIcon).toHaveBeenCalledWith('cog');
            (menuIcon as any).mockClear();
        });

        test('default stack configuration is ok', () => {
            const navigation = {
                dangerouslyGetParent: () => ({
                    state: {
                        index: 1
                    }
                }),
                goBack: jest.fn()
            };
            const defaultNavOptions = defaultStackNavigationOptions({ navigation, theme: 'dark' });

            defaultNavOptions.headerLeft.props.onPress();
            expect(navigation.goBack).toBeCalledWith(null);
            expect(defaultNavOptions).toMatchSnapshot();
        });

        test('default stack configuration should not display back button if there is nowhere to go back to', () => {
            const navigation = {
                dangerouslyGetParent: () => ({
                    state: {
                        index: 0
                    }
                })
            };
            const defaultNavOptions = defaultStackNavigationOptions({ navigation, theme: 'dark' });
            expect(defaultNavOptions).toMatchSnapshot();
        });
    });
});
