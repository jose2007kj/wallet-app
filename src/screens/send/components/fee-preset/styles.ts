import { StyleSheet } from 'react-native';
import { ITheme } from '../../../../core/theme/itheme';
import { BASE_DIMENSION, BORDER_RADIUS } from '../../../../styles/dimensions';

export default (theme: ITheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            margin: BASE_DIMENSION,
            backgroundColor: theme.colors.cardBackground,
            borderRadius: BORDER_RADIUS,
            borderWidth: 2,
            borderColor: theme.colors.cardBackground,
            alignItems: 'center',
            padding: BASE_DIMENSION
        },
        containerSelected: {
            borderColor: theme.colors.accentSecondary
        },
        fee: {
            fontSize: 16,
            lineHeight: 21,
            color: theme.colors.textSecondary
        },
        feeConverted: {
            color: theme.colors.textSecondary,
            fontSize: 15,
            lineHeight: 20
        },
        containerFeeConverted: {
            flexDirection: 'row',
            alignItems: 'baseline'
        },
        feeTitle: {
            fontSize: 16,
            lineHeight: 25,
            color: theme.colors.textSecondary
        },
        textSelected: {
            color: theme.colors.text
        }
    });
