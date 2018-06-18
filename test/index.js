const context = require.context(
  "mocha-loader!./", // Process through mocha-loader
  true, // Skip recursive processing
  /\.test.ts$/ // Pick only files ending with .test.ts
)

context.keys().forEach(context)
