module.exports = {
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^components/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
  testEnvironment: "jest-environment-jsdom",
};
