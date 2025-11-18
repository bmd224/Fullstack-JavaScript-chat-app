export default {
    projects: [
        {
            displayName: "react-tests", // For React tests
            testEnvironment: "jsdom",
            testMatch: ["**/test/*.jsx", "**/frontend/__tests__/*.jsx"], // Match frontend tests
            extensionsToTreatAsEsm: [".jsx"],
            transform: {
                "^.+\\.(jsx)$": ["babel-jest", { configFile: "./babel.config.cjs" }],
            },
            moduleNameMapper: {
                '^#utils/(.*)$': '<rootDir>/utils/$1',
            },
        },
        {
            displayName: "node-tests", // For Node.js tests
            testEnvironment: "node",
            testMatch: ["**/test/*.js", "**/backend/__tests__/*.js"], // Match backend tests
            transform: {

            },
            moduleNameMapper: {
                '^#utils/(.*)$': '<rootDir>/utils/$1',
            },
        },
    ],

};