import { StyleSheet } from 'react-native';
import { ITheme } from '../../../../core/theme/itheme';
import { BASE_DIMENSION, BORDER_RADIUS, ICON_CONTAINER_SIZE } from '../../../../styles/dimensions';

export default (theme: ITheme) =>
    StyleSheet.create({
        container: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
        },
        modalContainer: {
            backgroundColor: theme.colors.cardBackground,
            height: 380,
            borderRadius: BORDER_RADIUS * 2,
            marginHorizontal: BASE_DIMENSION * 3
        },
        contentContainer: {
            marginTop: BASE_DIMENSION * 5
        },
        rowContainer: {
            flexDirection: 'row',
            paddingVertical: BASE_DIMENSION * 2
        },
        rowChild: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        header: {
            height: ICON_CONTAINER_SIZE,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: BASE_DIMENSION
        },
        backButtonWrapper: {
            flex: 1
        },
        backButtonContainer: {
            flex: 1,
            flexDirection: 'row',
            paddingLeft: BASE_DIMENSION * 2
        },
        backText: {
            fontSize: 17,
            lineHeight: 22,
            color: theme.colors.text
        },
        doneWrapper: {
            flex: 1,
            alignItems: 'flex-end'
        },
        doneButton: {
            color: theme.colors.accent,
            paddingRight: BASE_DIMENSION * 2
        },
        titleWrapper: {
            flex: 2
        },
        title: {
            fontSize: theme.fontSize.regular,
            textAlign: 'center',
            fontWeight: 'bold'
        },
        leftIcon: {
            color: theme.colors.textSecondary,
            marginHorizontal: BASE_DIMENSION * 2
        },
        rightIcon: {
            color: theme.colors.accent,
            marginHorizontal: BASE_DIMENSION * 2
        },
        icon: {
            color: theme.colors.accent,
            alignSelf: 'center'
        },
        textRow: {
            fontSize: 17,
            lineHeight: 22,
            color: theme.colors.textSecondary
        }
    });
