export const formatToBRL = (value: number): string => {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return formatted.replace(/^R\$\s?/, "R$ ");
};
