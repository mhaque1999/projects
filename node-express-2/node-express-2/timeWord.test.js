const timeWord = require('./timeWord');

describe('#timeWord', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });

  test('returns "midnight" for 00:00', () => {
    expect(timeWord('00:00')).toBe('midnight');
  });

  test('returns "noon" for 12:00', () => {
    expect(timeWord('12:00')).toBe('noon');
  });

  test('handles times in the AM', () => {
    expect(timeWord('00:12')).toBe('twelve twelve am');
    expect(timeWord('01:00')).toBe('one o\'clock am');
    expect(timeWord('06:01')).toBe('six oh one am');
    expect(timeWord('06:10')).toBe('six ten am');
    expect(timeWord('06:18')).toBe('six eighteen am');
    expect(timeWord('06:30')).toBe('six thirty am');
    expect(timeWord('10:34')).toBe('ten thirty four am');
  });

  test('handles times in the PM', () => {
    expect(timeWord('12:09')).toBe('twelve oh nine pm');
    expect(timeWord('13:00')).toBe('one o\'clock pm');
    expect(timeWord('15:45')).toBe('three forty five pm');
    expect(timeWord('23:23')).toBe('eleven twenty three pm');
  });

  test('handles times with single-digit minutes', () => {
    expect(timeWord('02:05')).toBe('two oh five am');
    expect(timeWord('14:05')).toBe('two oh five pm');
  });

  test('handles times with o\'clock', () => {
    expect(timeWord('03:00')).toBe('three o\'clock am');
    expect(timeWord('15:00')).toBe('three o\'clock pm');
  });
});
