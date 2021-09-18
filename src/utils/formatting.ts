import parsePhoneNumber from 'libphonenumber-js';

// Types
export type FormattingNumberOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export const formatNumber = (
  numberToFormat: number,
  {
    locale = 'en-US',
    currency,
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

    return numberToFormat.toLocaleString(locale, options);
  }

  return '-';
};

export const formatPhoneNumber = (phoneNumberToFormat: string | number) => {
  const formatedPhoneNumber = parsePhoneNumber(phoneNumberToFormat.toString());

  return formatedPhoneNumber?.formatInternational() ?? phoneNumberToFormat;
};
