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

export const formatPhoneNumberForInput = (text: string): string => {
  if (!text) return '';

  let cleaned = text.replace(/\D/g, '');

  if (cleaned.length > 2 && cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  const truncated = cleaned.slice(0, 11);

  if (truncated.length > 7) {
    return `(0${truncated.slice(0, 2)}) ${truncated.slice(2, 7)}-${truncated.slice(7)}`;
  }
  if (truncated.length > 2) {
    return `(0${truncated.slice(0, 2)}) ${truncated.slice(2)}`;
  }
  return `(0${truncated}`;
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


export const cleanPhoneNumber = (text: string): string => {
    if (!text) return '';
    return text.replace(/\D/g, '').replace(/^0/, '').slice(0, 11);
};
