import { format } from 'date-fns';

export const formatCurrency = (amount, currency = 'ZAR') => {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date, formatString = 'dd MMM yyyy') => {
  return format(new Date(date), formatString);
};

export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/);
  if (match) {
    return `+27 ${match[1]} ${match[2]} ${match[3]}`;
  }
  return phoneNumber;
}; 