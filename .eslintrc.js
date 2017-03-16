module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },

  "plugins": [
    "react",
    "flowtype",
  ],
  "rules": {
    "react/jsx-uses-vars": [2],
    "flowtype/use-flow-type": 1,
    "flowtype/valid-syntax": 1,
    "no-console": 0,
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error","single"],
    "semi": ["error", "always"]
  },

  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": false
    }
  }

};
