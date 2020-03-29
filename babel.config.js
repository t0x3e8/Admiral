module.exports = {
  env: {
    development: {
      sourceMaps: true,
      retainLines: true
    }
  },
  presets: ["@babel/preset-env"],
  plugins: [["@babel/transform-runtime"]]
};
