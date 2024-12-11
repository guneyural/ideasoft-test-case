export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
export const stockTypeLabelTranslator = (text: string) => {
  switch (text) {
    case "Piece":
      return "Adet";
    case "cm":
      return "Santimetre";
    case "Dozen":
      return "Düzine";
    case "gram":
      return "Gram";
    case "kg":
      return "Kilogram";
    case "Person":
      return "Kişi";
    case "Package":
      return "Paket";
    case "metre":
      return "Metre";
    case "m2":
      return "Metre Kare";
    case "pair":
      return "Çift";
    default:
      return text;
  }
};
export const currencyLabelTranslator = (currencyId: string) => {
  switch (currencyId) {
    case "1":
      return "Dolar";
    case "2":
      return "Euro";
    case "3":
      return "Türk Lirası";
    default:
      return "";
  }
};
