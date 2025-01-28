export default function formatCurrency(number, locale, fractionDigits) {
  number = parseFloat(number);
  number = isNaN(number) ? 0 : number;
  locale = locale === undefined || typeof locale != 'string' || locale.length === 0 ? 'en-US' : locale;
  fractionDigits = parseInt(fractionDigits);
  fractionDigits = isNaN(fractionDigits) ? 2 : fractionDigits;

  let absNumber = Math.abs(number);
  let formatted;
  let suffix = '';

  if (absNumber >= 1e9) {
    // Billions
    formatted = absNumber / 1e9;
    if (formatted < 1) {
      formatted *= 1000;  // Convert to millions if < 1B
      suffix = 'M';
    } else {
      suffix = 'B';
    }
  } else if (absNumber >= 1e6) {
    // Millions
    formatted = absNumber / 1e6;
    if (formatted < 1) {
      formatted *= 1000;  // Convert to thousands if < 1M
      suffix = 'k';
    } else {
      suffix = 'M';
    }
  } else if (absNumber >= 1e3) {
    // Thousands
    formatted = absNumber / 1e3;
    suffix = 'k';
  } else {
    // Less than 1000, no suffix
    formatted = absNumber;
  }

  let formatter = new Intl.NumberFormat(locale, {
    'style':                 'currency',
    'currency':              new Intl.Locale(locale).maximize().currency || 'USD',
    'minimumFractionDigits': fractionDigits,
    'maximumFractionDigits': fractionDigits
  });

  return formatter.format(formatted) + suffix;
}
