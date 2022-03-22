const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, 'tsconfig.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "appsManager",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({

        name: "appsManager",
        filename: "remoteEntry.js",
        exposes: {
            'AppsManagerModule': './/src/app/apps-manager/apps-manager.module.ts',
        },

        shared: share({
          "@angular/core": { eager: true},
          "@angular/common": { eager: true },
          "@angular/common/http": { eager: true },
          "@angular/router": { eager: true },
          // "@argo/common": { eager: true },
          // "@argo/core": { eager: true },
          // "@argo/multilanguage": { eager: true },
          "@ngx-translate/core": { eager: true },
          "@ngx-translate/http-loader": { eager: true },
          "@angular/material": { eager: true },

          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
