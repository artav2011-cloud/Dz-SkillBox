export function isValidDateFormat(value: string): boolean {
  const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
  return datePattern.test(value);
}

export function hasOnlyDigitsAndDots(value: string): boolean {
  return /^[\d.]+$/.test(value);
}

export function hasNoSpecialChars(value: string): boolean {
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};:'",<>?/\\|`~]/;
  return !specialChars.test(value);
}

export function parseDate(value: string): Date | null {
  if (!isValidDateFormat(value)) {
    return null;
  }

  const parts = value.split('.');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function isDateNotInPast(value: string): boolean {
  const date = parseDate(value);
  if (!date) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date >= today;
}

export function validateDate(value: string): { isValid: boolean; error: string | null } {
  if (!value || value.trim().length === 0) {
    return {
      isValid: false,
      error: 'Пожалуйста, введите дату',
    };
  }

  const specialChars = /[!@#$%^&*()_+\-=\[\]{};:'",<>?/\\|`~]/;
  if (specialChars.test(value)) {
    return {
      isValid: false,
      error: 'Дата содержит недопустимые символы',
    };
  }

  if (!hasOnlyDigitsAndDots(value)) {
    return {
      isValid: false,
      error: 'Дата должна содержать только цифры и точки',
    };
  }

  if (!isValidDateFormat(value)) {
    return {
      isValid: false,
      error: 'Дата должна быть в формате ДД.ММ.ГГГГ',
    };
  }

  const date = parseDate(value);
  if (!date) {
    return {
      isValid: false,
      error: 'Некорректная дата (проверьте день и месяц)',
    };
  }

  if (!isDateNotInPast(value)) {
    return {
      isValid: false,
      error: 'Дата не может быть раньше текущей',
    };
  }

  return {
    isValid: true,
    error: null,
  };
}
