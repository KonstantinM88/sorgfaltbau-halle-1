export const COMPANY_STREET_ADDRESS = 'Waldmeisterstraße 19';
export const COMPANY_POSTAL_CODE = '06120';
export const COMPANY_CITY = 'Halle (Saale)';
export const COMPANY_POSTAL_CITY = `${COMPANY_POSTAL_CODE} ${COMPANY_CITY}`;
export const COMPANY_ADDRESS_TEXT = `${COMPANY_STREET_ADDRESS}, ${COMPANY_POSTAL_CITY}`;
export const COMPANY_MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_ADDRESS_TEXT)}`;

export const COMPANY_PRIMARY_PHONE = process.env.NEXT_PUBLIC_PHONE || '+49 176 623 76 777';
export const COMPANY_SECONDARY_PHONE = process.env.NEXT_PUBLIC_SECONDARY_PHONE || '+49 176 237 95 681';
export const COMPANY_PHONE_TEXT = `${COMPANY_PRIMARY_PHONE} / ${COMPANY_SECONDARY_PHONE}`;
