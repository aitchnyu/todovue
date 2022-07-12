module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleNameMapper: {
    // eslint-disable-next-line vue/max-len
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/testUtils/fileMock.js",
    "\\.(css|less)$": "<rootDir>/src/testUtils/styleMock.js",
  },
};
