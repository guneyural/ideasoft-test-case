export const calculateTaxIncludedValue = (
  tax: number,
  price: number,
  currencyId: number | null,
  returnAsString = true
): string | number => {
  const taxIncludedValue = price + (price * tax) / 100;

  return returnAsString
    ? formatPrice(taxIncludedValue, currencyId)
    : taxIncludedValue;
};

export const calculateDiscountedPrice = (
  price: number,
  discount: number,
  discountType: number,
  tax: number,
  taxIncluded: number,
  currencyId: number,
  calculateTax = true
): string => {
  let discountedPrice: number;

  if (discountType === 1) {
    discountedPrice = price - (price * discount) / 100;
  } else if (discountType === 0) {
    discountedPrice = discount;
  } else {
    discountedPrice = price;
  }

  if (taxIncluded === 0 && calculateTax) {
    return calculateTaxIncludedValue(
      tax,
      discountedPrice,
      currencyId
    ) as string;
  }

  return formatPrice(discountedPrice, currencyId);
};

export const calculateDiscountedPriceAsNumber = (
  price: number,
  discount: number,
  discountType: number,
  tax: number,
  taxIncluded: number
): number => {
  let discountedPrice: number;

  if (discountType === 1) {
    discountedPrice = price - (price * discount) / 100;
  } else if (discountType === 0) {
    discountedPrice = discount;
  } else {
    discountedPrice = price;
  }

  if (taxIncluded === 0) {
    return calculateTaxIncludedValue(
      tax,
      discountedPrice,
      null,
      false
    ) as number;
  }

  return discountedPrice;
};

export const formatPrice = (price: number, currencyId: number): string => {
  const currencyCodes = {
    1: "USD",
    2: "EUR",
    3: "TRY",
  };

  const currencyCode = currencyCodes[currencyId] || "USD";
  const locale = currencyCode === "TRY" ? "tr-TR" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const calculateDiscountPercentage = (
  price: number,
  discountedPrice: number,
  tax: number,
  taxIncluded: number
): number => {
  const priceWithTax = taxIncluded === 0 ? price + (price * tax) / 100 : price;

  const discountPercentage =
    ((priceWithTax - discountedPrice) / priceWithTax) * 100;

  return Math.round(Math.round(discountPercentage * 100) / 100);
};

export const calculateMoneyOrderPrice = (
  price: number,
  moneyOrderDiscount: number,
  taxIncluded: number,
  tax: number,
  productDiscountType: number,
  productDiscount: number
): string => {
  let priceToWorkOn = calculateDiscountedPriceAsNumber(
    price,
    productDiscount,
    productDiscountType,
    tax,
    taxIncluded
  );

  if (moneyOrderDiscount <= 0) return String(priceToWorkOn);

  const discountedPrice =
    priceToWorkOn - (priceToWorkOn * moneyOrderDiscount) / 100;
  return discountedPrice.toFixed(2);
};

export const getTaxExcludedPrice = (price: number, tax: number): string => {
  return (price / (1 + tax / 100)).toFixed(2);
};
