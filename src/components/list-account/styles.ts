import { StyleSheet, Platform } from 'react-native';
import { BASE_DIMENSION, BORDER_RADIUS, ICON_CONTAINER_SIZE } from '../../styles/dimensions';
import { ITheme } from '../../core/theme/itheme';

export default (theme: ITheme) =>
    StyleSheet.create({
        card: {
            flexDirection: 'row',
            backgroundColor: theme.colors.cardBackground,
            borderRadius: BORDER_RADIUS,
            padding: BASE_DIMENSION,
            alignItems: 'center',
            marginBottom: BASE_DIMENSION,
            paddingVertical: BASE_DIMENSION * 2,
            borderWidth: 2,
            borderColor: theme.colors.cardBackground
        },
        labelContainer: {
            flex: 1
        },
        label: {
            fontSize: 18,
            lineHeight: 25,
            fontWeight: '500',
            letterSpacing: 0.38,
            color: theme.colors.text
        },
        selected: {
            borderColor: theme.colors.accentSecondary
        },
        iconLeftContainer: {
            marginLeft: Platform.select({
                default: BASE_DIMENSION,
                web: BASE_DIMENSION / 4
            }),
            marginRight: Platform.select({
                default: BASE_DIMENSION * 2,
                web: BASE_DIMENSION
            })
        },
        iconRightContainer: {
            height: ICON_CONTAINER_SIZE,
            width: ICON_CONTAINER_SIZE,
            alignItems: 'flex-end',
            justifyContent: 'center'
        },
        icon: {
            color: theme.colors.accent
        },
        accountIcon: {
            height: ICON_CONTAINER_SIZE,
            width: ICON_CONTAINER_SIZE
        },
        createButton: {
            backgroundColor: theme.colors.accent,
            borderColor: theme.colors.accent,
            paddingHorizontal: BASE_DIMENSION * 2
        }
    });
