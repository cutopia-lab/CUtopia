import { PASSWORD_RULE, USER_ID_RULE, USERNAME_RULE } from './rules';

describe('Rule: password', () => {
  it('should reject short length', () => {
    const pwd = '1234567';
    expect(PASSWORD_RULE.test(pwd)).toBe(false);
  });
  it('should reject white space', () => {
    const pwd = '1234567 ';
    expect(PASSWORD_RULE.test(pwd)).toBe(false);
  });
  it('should NOT reject long length', () => {
    const pwd = '123456790123456';

    expect(PASSWORD_RULE.test(pwd)).toBe(true);
  });
  it('should NOT reject special char', () => {
    const pwd = ')*+,-./:;<=>?@[';

    expect(PASSWORD_RULE.test(pwd)).toBe(true);
  });
});

describe('Rule: username', () => {
  it('should reject long length', () => {
    const str = '12345678901';
    expect(USERNAME_RULE.test(str)).toBe(false);
  });
});

describe('Rule: SID', () => {
  it('should reject length != 10', () => {
    const str = '12345678901';
    expect(USER_ID_RULE.test(str)).toBe(false);
  });
  it('should NOT reject length of 10', () => {
    const str = '1234567891';
    expect(USER_ID_RULE.test(str)).toBe(true);
  });
});