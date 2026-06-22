export function hasEscaping(value: string): boolean {
  const escapingPattern = /<[^>]*>/;
  return escapingPattern.test(value);
}

export function isValidCityName(value: string): boolean {
  if (!value || value.trim().length === 0) {
    return false;
  }
  // Добавлены буквы с диакритикой: ÅåÄäÖöÜüİığĞşŞçÇ
  const validPattern = /^[a-zA-Zа-яА-Я\s\-!.,'’ÅåÄäÖöÜüİığĞşŞçÇ]+$/;
  return validPattern.test(value.trim());
}

export function isCityNotEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function validateCity(value: string): { isValid: boolean; error: string | null } {
  if (!isCityNotEmpty(value)) {
    return {
      isValid: false,
      error: 'Пожалуйста, введите город или страну',
    };
  }

  if (hasEscaping(value)) {
    return {
      isValid: false,
      error: 'Недопустимые символы (HTML-теги)',
    };
  }

  if (!isValidCityName(value)) {
    return {
      isValid: false,
      error: 'Название содержит недопустимые символы',
    };
  }

  return {
    isValid: true,
    error: null,
  };
}
