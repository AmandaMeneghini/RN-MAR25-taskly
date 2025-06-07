// src/Utils/textFormatters.ts

// Função para capitalizar nomes corretamente
export const capitalizeName = (name: string): string => {
  if (!name) return '';
  const exceptions = ['da', 'de', 'do', 'das', 'dos'];
  return name
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (exceptions.includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

// MODIFICADO: Renomeada para ser específica para campos de INPUT
// Máscara: (0XX) X XXXX-XXXX
export const formatPhoneNumberForInput = (text: string): string => {
  if (!text) return '';
  const cleaned = text.replace(/\D/g, '').slice(0, 11);
  const match = cleaned.match(/^(\d{2})(\d{1})(\d{0,4})(\d{0,4})$/);
  if (!match) return cleaned;

  let response = `(0${match[1]}`;
  if (match[2]) response += `) ${match[2]}`;
  if (match[3]) response += ` ${match[3]}`;
  if (match[4]) response += `-${match[4]}`;
  
  return response;
};

export const formatPhoneNumberForDisplay = (phone: string): string => {
  if (!phone || phone.length !== 11) {
    return phone;
  }
  const match = phone.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]} - ${match[3]}`;
  }
  return phone;
};
