import React, { FC, memo, PropsWithChildren } from 'react';
import { Text, TextProps } from 'react-native';

// Styling
import { Colors } from 'src/layout';

/**
 * CSS font weight aliases
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#common_weight_name_mapping
 */
export enum TypographyWeights {
  thin = '100',
  extraLight = '200',
  lite = '300',
  regular = '400',
  medium = '500',
  semiBold = '600',
  bold = '700',
  extraBold = '800',
  black = '900',
}

/**
 * Typography variant to be displayed.
 *
 * Naming are based on Apple Human Interface Guidelines:
 * https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/
 */
export enum TypographyVariantSizes {
  title1 = 28,
  title2 = 22,
  title3 = 18,
  headline = 16,
  body = 14,
  callout = 12,
}

export type TypographyProps = TextProps & {
  weight?: keyof typeof TypographyWeights;
  variant?: keyof typeof TypographyVariantSizes;
  color?: string;
};

const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  weight,
  variant,
  color,
  style,
  children,
  ...props
}) => {
  const fontSize = TypographyVariantSizes[variant ?? 'body'];

  return (
    <Text
      {...props}
      style={[
        { fontSize },
        !!weight && { fontWeight: TypographyWeights[weight] },
        { color: color ?? Colors.Black },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default memo(Typography);
