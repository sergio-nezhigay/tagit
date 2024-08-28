/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  appDirectory: "app", // Directory where your application code is located
  assetsBuildDirectory: "public/build", // Directory where Remix will output built assets
  serverBuildDirectory: "build", // Directory where Remix will output the server build
  publicPath: "/build/", // The path to assets in your app
  ignoredRouteFiles: ["**/.*"], // Ignore files like .DS_Store
  future: {
    v2_routeConvention: true, // Enable future route conventions
    unstable_tailwind: true, // Enable Tailwind CSS integration
  },
  sourceMap: true, // Enable source maps for easier debugging
  serverDependenciesToBundle: [/^remix-utils.*/],
};
