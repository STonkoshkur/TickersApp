import parsePhoneNumber from 'libphonenumber-js';

// Types
export type FormattingNumberOptions = {
  locale?: string;
  prefixSymbol?: boolean;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export const formatNumber = (
  numberToFormat: number,
  {
    locale = 'en-US',
    currency,
    prefixSymbol = false,
    ...optionsFromProps
  }: FormattingNumberOptions = {},
): string => {
  if (!isNaN(numberToFormat)) {
    let options: Partial<Intl.NumberFormatOptions> = { ...optionsFromProps };

    // Apply currency-style options
    if (currency) {
      options = {
        ...options,
        style: 'currency',
        currency,
      };
    }

    let formattedNumber = numberToFormat.toLocaleString(locale, options);

    // Add '+' prefix symbol if value is positive and prefixSymbol option is enabled
    if (prefixSymbol && numberToFormat > 0) {
      formattedNumber = `+${formattedNumber}`;
    }

    return formattedNumber;
  }

  return '-';
};

export const formatPhoneNumber = (phoneNumberToFormat: string | number) => {
  const formatedPhoneNumber = parsePhoneNumber(phoneNumberToFormat.toString());

  return formatedPhoneNumber?.formatInternational() ?? phoneNumberToFormat;
};
