export type Gateway = "stripe" | "asaas";
export type Locale = "pt-BR" | "en-US" | "en-GB" | "es-AR" | "es-CO" | "es-MX" | "es-ES" | "pt-PT" | "fr-FR" | "de-DE";

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  locale: Locale;
  phonePrefix: string;
  phoneMask: string;
  phonePlaceholder: string;
  documentLabel: string;
  documentPlaceholder: string;
  documentMask: string;
  gateways: Gateway[];
  defaultGateway: Gateway;
  paymentMethods: string[];
  stateLabel: string;
  zipLabel: string;
  zipPlaceholder: string;
}

export const COUNTRIES: CountryConfig[] = [
  {
    code: "BR", name: "Brasil", flag: "🇧🇷",
    currency: "BRL", currencySymbol: "R$",
    locale: "pt-BR",
    phonePrefix: "+55", phoneMask: "(XX) XXXXX-XXXX", phonePlaceholder: "(11) 98765-4321",
    documentLabel: "CPF / CNPJ", documentPlaceholder: "00.000.000/0001-00", documentMask: "XX.XXX.XXX/XXXX-XX",
    gateways: ["stripe", "asaas"], defaultGateway: "asaas",
    paymentMethods: ["PIX", "Boleto Bancário", "Cartão de Crédito", "Cartão de Débito"],
    stateLabel: "Estado", zipLabel: "CEP", zipPlaceholder: "00000-000",
  },
  {
    code: "US", name: "United States", flag: "🇺🇸",
    currency: "USD", currencySymbol: "$",
    locale: "en-US",
    phonePrefix: "+1", phoneMask: "(XXX) XXX-XXXX", phonePlaceholder: "(555) 987-6543",
    documentLabel: "EIN / SSN", documentPlaceholder: "XX-XXXXXXX", documentMask: "XX-XXXXXXX",
    gateways: ["stripe"], defaultGateway: "stripe",
    paymentMethods: ["Credit Card", "ACH / Bank Transfer", "Wire Transfer"],
    stateLabel: "State", zipLabel: "ZIP Code", zipPlaceholder: "10001",
  },
  {
    code: "PT", name: "Portugal", flag: "🇵🇹",
    currency: "EUR", currencySymbol: "€",
    locale: "pt-PT",
    phonePrefix: "+351", phoneMask: "XXX XXX XXX", phonePlaceholder: "912 345 678",
    documentLabel: "NIF", documentPlaceholder: "000000000", documentMask: "XXXXXXXXX",
    gateways: ["stripe"], defaultGateway: "stripe",
    paymentMethods: ["Cartão de Crédito", "Débito SEPA", "Transferência Bancária"],
    stateLabel: "Distrito", zipLabel: "Código Postal", zipPlaceholder: "1000-001",
  },
  {
    code: "GB", name: "United Kingdom", flag: "🇬🇧",
    currency: "GBP", currencySymbol: "£",
    locale: "en-GB",
    phonePrefix: "+44", phoneMask: "XXXXX XXXXXX", phonePlaceholder: "07700 900123",
    documentLabel: "Company Number / UTR", documentPlaceholder: "12345678", documentMask: "XXXXXXXX",
    gateways: ["stripe"], defaultGateway: "stripe",
    paymentMethods: ["Credit Card", "Direct Debit", "Bank Transfer"],
    stateLabel: "County", zipLabel: "Postcode", zipPlaceholder: "SW1A 1AA",
  },
  {
    code: "AR", name: "Argentina", flag: "🇦🇷",
    currency: "ARS", currencySymbol: "$",
    locale: "es-AR",
    phonePrefix: "+54", phoneMask: "XX XXXX-XXXX", phonePlaceholder: "11 2345-6789",
    documentLabel: "CUIT / CUIL", documentPlaceholder: "XX-XXXXXXXX-X", documentMask: "XX-XXXXXXXX-X",
    gateways: ["stripe"], defaultGateway: "stripe",
    paymentMethods: ["Tarjeta de Crédito", "Débito", "Transferencia Bancaria"],
    stateLabel: "Provincia", zipLabel: "Código Postal", zipPlaceholder: "1000",
  },
  {
    code: "CO", name: "Colombia", flag: "🇨🇴",
    currency: "COP", currencySymbol: "$",
    locale: "es-CO",
    phonePrefix: "+57", phoneMask: "XXX XXX XXXX", phonePlaceholder: "321 123 4567",
    documentLabel: "NIT / CC", documentPlaceholder: "000.000.000-0", documentMask: "XXX.XXX.XXX-X",
    gateways: ["stripe"], defaultGateway: "stripe",
    paymentMethods: ["Tarjeta de Crédito", "PSE", "Transferencia"],
    stateLabel: "Departamento", zipLabel: "Código Postal", zipPlaceholder: "110111",
  },
  {
    code: "MX", name: "México", flag: "🇲🇽",
    currency: "MXN", currencySymbol: "$",
    locale: "es-MX",
    phonePrefix: "+52", phoneMask: "XX XXXX XXXX", phonePlaceholder: "55 1234 5678",
    documentLabel: "RFC", documentPlaceholder: "AAAA000000XXX", documentMask: "XXXX000000XXX",
    gateways: ["stripe"], defaultGateway: "stripe",
    paymentMethods: ["Tarjeta de Crédito", "SPEI", "Efectivo (OXXO)"],
    stateLabel: "Estado", zipLabel: "Código Postal", zipPlaceholder: "06600",
  },
  {
    code: "ES", name: "España", flag: "🇪🇸",
    currency: "EUR", currencySymbol: "€",
    locale: "es-ES",
    phonePrefix: "+34", phoneMask: "XXX XXX XXX", phonePlaceholder: "612 345 678",
    documentLabel: "NIF / CIF", documentPlaceholder: "A00000000", documentMask: "AXXXXXXXX",
    gateways: ["stripe"], defaultGateway: "stripe",
    paymentMethods: ["Tarjeta de Crédito", "Débito SEPA", "Transferencia"],
    stateLabel: "Comunidad Autónoma", zipLabel: "Código Postal", zipPlaceholder: "28001",
  },
  {
    code: "FR", name: "France", flag: "🇫🇷",
    currency: "EUR", currencySymbol: "€",
    locale: "fr-FR",
    phonePrefix: "+33", phoneMask: "0X XX XX XX XX", phonePlaceholder: "06 12 34 56 78",
    documentLabel: "SIREN / SIRET", documentPlaceholder: "000 000 000", documentMask: "XXX XXX XXX",
    gateways: ["stripe"], defaultGateway: "stripe",
    paymentMethods: ["Carte de Crédit", "Virement SEPA", "Prélèvement SEPA"],
    stateLabel: "Région", zipLabel: "Code Postal", zipPlaceholder: "75001",
  },
  {
    code: "DE", name: "Deutschland", flag: "🇩🇪",
    currency: "EUR", currencySymbol: "€",
    locale: "de-DE",
    phonePrefix: "+49", phoneMask: "0XXX XXXXXXXX", phonePlaceholder: "0151 12345678",
    documentLabel: "Steuernummer / USt-IdNr.", documentPlaceholder: "DE000000000", documentMask: "DEXXXXXXXXX",
    gateways: ["stripe"], defaultGateway: "stripe",
    paymentMethods: ["Kreditkarte", "SEPA-Lastschrift", "Überweisung"],
    stateLabel: "Bundesland", zipLabel: "Postleitzahl", zipPlaceholder: "10115",
  },
];

export const GATEWAY_META: Record<Gateway, { label: string; color: string; bgColor: string; borderColor: string; description: string }> = {
  stripe: {
    label: "Stripe",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    borderColor: "border-violet-200 dark:border-violet-800/50",
    description: "Aceita cartão, Apple Pay, Google Pay, ACH, SEPA e mais de 135 moedas.",
  },
  asaas: {
    label: "Asaas",
    color: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-50 dark:bg-sky-950/30",
    borderColor: "border-sky-200 dark:border-sky-800/50",
    description: "Gateway brasileiro. Aceita PIX, Boleto, Cartão de Crédito/Débito. Exclusivo para clientes no Brasil.",
  },
};

export const PORTAL_LANGUAGES: Record<Locale, string> = {
  "pt-BR": "Português (Brasil)",
  "en-US": "English (US)",
  "en-GB": "English (UK)",
  "es-AR": "Español (Argentina)",
  "es-CO": "Español (Colombia)",
  "es-MX": "Español (México)",
  "es-ES": "Español (España)",
  "pt-PT": "Português (Portugal)",
  "fr-FR": "Français",
  "de-DE": "Deutsch",
};

export function getCountry(code: string): CountryConfig {
  return COUNTRIES.find(c => c.code === code) ?? COUNTRIES[0];
}

export function formatCurrency(value: number, currency: string, locale: string): string {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 2 }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}
