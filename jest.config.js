export default {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^~assets(.*)$": "<rootDir>/assets$1",
    "^~src(.*)$": "<rootDir>/src$1",
  },
  testMatch: ["**/tests/**/*.test.(js|jsx|ts|tsx)"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
};
