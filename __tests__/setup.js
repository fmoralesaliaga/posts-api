// Test setup file
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'file:./test.db';
process.env.LOG_LEVEL = 'error';

// Add a dummy test to prevent Jest from complaining
describe('Test Setup', () => {
  test('setup complete', () => {
    expect(true).toBe(true);
  });
});
