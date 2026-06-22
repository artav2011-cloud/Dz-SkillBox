import {
  hasEscaping,
  isValidCityName,
  isCityNotEmpty,
  validateCity,
} from './validateCity';

describe('validateCity - Валидация города', () => {
  describe('hasEscaping - проверка на экранирование', () => {
    test('должен вернуть true, если есть HTML-тег', () => {
      expect(hasEscaping('<script>alert("xss")</script>')).toBe(true);
      expect(hasEscaping('<div>Paris</div>')).toBe(true);
    });

    test('должен вернуть false, если нет HTML-тегов', () => {
      expect(hasEscaping('Saint-Louis-du-Ha! Ha!')).toBe(false);
      expect(hasEscaping('Ağrı')).toBe(false);
      expect(hasEscaping('Moscow')).toBe(false);
    });
  });

  describe('isValidCityName - проверка допустимых символов', () => {
    test('должен пропускать название с восклицательным знаком и дефисами', () => {
      expect(isValidCityName('Saint-Louis-du-Ha! Ha!')).toBe(true);
    });

    test('должен пропускать название со спецсимволами (Ağrı)', () => {
      expect(isValidCityName('Ağrı')).toBe(true);
      expect(isValidCityName('İstanbul')).toBe(true);
      expect(isValidCityName('München')).toBe(true);
    });

    test('должен пропускать название из одной буквы', () => {
      expect(isValidCityName('A')).toBe(true);
      expect(isValidCityName('Я')).toBe(true);
    });

    test('должен НЕ пропускать спецсимволы', () => {
      expect(isValidCityName('Moscow@123')).toBe(false);
      expect(isValidCityName('Paris#')).toBe(false);
      expect(isValidCityName('London$')).toBe(false);
    });

    test('должен НЕ пропускать пустую строку', () => {
      expect(isValidCityName('')).toBe(false);
      expect(isValidCityName('   ')).toBe(false);
    });
  });

  describe('isCityNotEmpty - проверка на пустоту', () => {
    test('должен вернуть false для пустой строки', () => {
      expect(isCityNotEmpty('')).toBe(false);
      expect(isCityNotEmpty('   ')).toBe(false);
    });

    test('должен вернуть true для непустой строки', () => {
      expect(isCityNotEmpty('Paris')).toBe(true);
      expect(isCityNotEmpty('  Moscow  ')).toBe(true);
    });
  });

  describe('validateCity - полная валидация', () => {
    test('должен вернуть ошибку, если город не введён', () => {
      const result = validateCity('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Пожалуйста, введите город или страну');
    });

    test('должен вернуть ошибку при экранировании', () => {
      const result = validateCity('<script>alert("xss")</script>');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Недопустимые символы (HTML-теги)');
    });

    test('должен пропускать название с восклицательным знаком', () => {
      const result = validateCity('Saint-Louis-du-Ha! Ha!');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    test('должен пропускать название со спецсимволами (Ağrı)', () => {
      const result = validateCity('Ağrı');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    test('должен пропускать название из одной буквы', () => {
      const result = validateCity('A');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });

    test('должен пропускать корректное название города', () => {
      const result = validateCity('Paris');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeNull();
    });
  });
});
