import { StyleSheet } from 'react-native';
import { ITheme } from '../../../../core/theme/itheme';
import { BASE_DIMENSION, BORDER_RADIUS } from '../../../../styles/dimensions';

export default (theme: ITheme) =>
    StyleSheet.create({
        container: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center'
        },
        modalContainer: {
            backgroundColor: theme.colors.modalBackground,
            height: 380,
            borderRadius: BORDER_RADIUS * 2,
            marginLeft: BASE_DIMENSION * 3,
            marginRight: BASE_DIMENSION * 3
        },
        contentContainer: {
            marginTop: BASE_DIMENSION * 5
        },
        rowContainer: {
            flexDirection: 'row',
            paddingVertical: BASE_DIMENSION
        },
        rowChild: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        leftIcon: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: BASE_DIMENSION * 2,
            paddingRight: BASE_DIMENSION * 2
        },
        rightIcon: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: BASE_DIMENSION
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: BASE_DIMENSION * 3
        },
        headerButton: {},
        backButtonWrapper: {
            flex: 1
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
        icon: {
            color: theme.colors.accent, // TODO: check here with Figma
            padding: 4
        },
        textRow: {
            fontSize: theme.fontSize.regular,
            lineHeight: 30
        }
    });