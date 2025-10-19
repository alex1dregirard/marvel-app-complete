module.exports = {
  testEnvironment: "jest-fixed-jsdom", // Use jsdom environment for testing React components
  // Transform jsx files using babel-jest
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // Collect coverage from all js or jsx files in src folder
    "!src/routes.js", // Exclude routes.js from coverage
    "!src/main.jsx", // Exclude main.jsx from coverage
    "!src/App.jsx", // Exclude App.jsx from coverage

  ],
  testResultsProcessor: 'jest-sonar-reporter',
  moduleNameMapper: {
    "d3": "<rootDir>/node_modules/d3/dist/d3.min.js"
  }
};