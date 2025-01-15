module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^react-router-dom$':
      '<rootDir>/node_modules/react-router-dom/dist/index.js', // Map to the main file
  },
};
