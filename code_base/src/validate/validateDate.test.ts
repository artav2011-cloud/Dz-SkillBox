import {
  isValidDateFormat,
  hasOnlyDigitsAndDots,
  hasNoSpecialChars,
  parseDate,
  isDateNotInPast,
  validateDate,
} from './validateDate';

describe('validateDate - Валидация даты', () => {
  const realDate = Date;

  beforeAll(() => {
    global.Date = class extends Date {
      constructor(...args: any[]) {
        if (args.length === 0) {
          super(2024, 0, 15);
        } else {
          super(...args);
        }
      }
    } as DateConstructor;
  });

  afterAll(() => {
    global.Date = realDate;
  });

  describe('isValidDateFormat - проверка формата ДД.ММ.ГГГГ', () => {
    test('должен пропускать дату в формате ДД.ММ.ГГГГ', () => {
      expect(isValidDateFormat('15.01.2024')).toBe(true);
      expect(isValidDateFormat('01.01.2024')).toBe(true);
      expect(isValidDateFormat('31.12.2024')).toBe(true);
    });

    test('должен НЕ пропускать дату с буквами', () => {
      expect(isValidDateFormat('15.01.2024a')).toBe(false);
    });

    test('должен НЕ пропускать дату без точек', () => {
      expect(isValidDateFormat('15012024')).toBe(false);
      expect(isValidDateFormat('15-01-2024')).toBe(false);
      expect(isValidDateFormat('15/01/2024')).toBe(false);
    });
  });

  describe('hasOnlyDigitsAndDots - проверка на цифры и точки', () => {
    test('должен вернуть true для строки с цифрами и точками', () => {
      expect(hasOnlyDigitsAndDots('15.01.2024')).toBe(true);
    });

    test('должен вернуть false для строки с буквами', () => {
      expect(hasOnlyDigitsAndDots('15.01.2024a')).toBe(false);
      expect(hasOnlyDigitsAndDots('abc')).toBe(false);
    });
  });

  describe('hasNoSpecialChars - проверка на спецсимволы', () => {
    test('должен вернуть true для строки без спецсимволов', () => {
      expect(hasNoSpecialChars('15.01.2024')).toBe(true);
    });

    test('должен вернуть false для строки со спецсимволами', () => {
      expect(hasNoSpecialChars('15.01.2024!')).toBe(false);
      expect(hasNoSpecialChars('15.01.2024#')).toBe(false);
    });
  });

  describe('parseDate - парсинг даты', () => {
    test('должен корректно парсить дату в формате ДД.ММ.ГГГГ', () => {
      const result = parseDate('15.01.2024');
      expect(result).toBeInstanceOf(Date);
      expect(result?.getFullYear()).toBe(2024);
      expect(result?.getMonth()).toBe(0);
      expect(result?.getDate()).toBe(15);
    });

    test('должен вернуть null для невалидной даты', () => {
      expect(parseDate('31.02.2024')).toBeNull();
      expect(parseDate('32.01.2024')).toBeNull();
    });
  });

  describe('isDateNotInPast - проверка, что дата не в прошлом', () => {
    test('должен вернуть true для даты в будущем', () => {
      expect(isDateNotInPast('16.01.2024')).toBe(true);
    });

    test('должен вернуть true для текущей даты', () => {
      expect(isDateNotInPast('15.01.2024')).toBe(true);
    });

    test('должен вернуть false для даты в прошлом', () => {
      expect(isDateNotInPast('14.01.2024')).toBe(false);
    });
  });

  describe('validateDate - полная валидация', () => {
    test('должен пропускать валидную дату в будущем', () => {
      const result = validateDate('16.01.2024');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    test('должен выдавать ошибку для пустой даты', () => {
      const result = validateDate('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Пожалуйста, введите дату');
    });

    test('должен выдавать ошибку для даты в прошлом', () => {
      const result = validateDate('14.01.2024');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Дата не может быть раньше текущей');
    });

    test('должен выдавать ошибку для даты со спецсимволами', () => {
      const result = validateDate('15.01.2024!');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Дата содержит недопустимые символы');
    });

    test('должен выдавать ошибку для даты с буквами', () => {
      const result = validateDate('15.01.2024a');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Дата должна содержать только цифры и точки');
    });

    test('должен выдавать ошибку для несуществующей даты', () => {
      const result = validateDate('31.02.2024');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Некорректная дата (проверьте день и месяц)');
    });

    test('должен выдавать ошибку для неверного формата', () => {
      const result = validateDate('15012024');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Дата должна быть в формате ДД.ММ.ГГГГ');
    });
  });
});
