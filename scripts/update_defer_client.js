const { argv } = require("process");
const { exec } = require("child_process");
const { readFileSync, existsSync } = require("fs");
const { resolve: resolvePath, join } = require("path");

// Usage: node ./scripts/update_defer_client.js 1.4.0-alpha-20220830143058-6693f3074

(async function () {
  const { globby } = await import("globby");

  const deferDesiredVersion = argv[2];

  globby("./*/**/package.json", {
    ignore: ["./*/**/node_modules/**", "./*/dist/**"],
  })
    .then((files) => {
      return Promise.all(
        files.map(
          (filePath) =>
            new Promise((resolve, reject) => {
              const cwd = filePath.replace("/package.json", "");

              const pkg = JSON.parse(readFileSync(filePath));

              if (
                !Object.keys(pkg.dependencies || {}).includes("@defer/client")
              ) {
                return;
              }

              console.log(`${cwd}: Started`);
              let pkgManager = "yarn";
              if (
                existsSync(
                  resolvePath(cwd, join("../../", "/package-lock.json"))
                ) ||
                existsSync(resolvePath(cwd, "./package-lock.json"))
              ) {
                pkgManager = "npm";
              } else if (
                existsSync(
                  resolvePath(cwd, join("../../", "/pnpm-lock.yaml"))
                ) ||
                existsSync(resolvePath(cwd, "./pnpm-lock.yaml"))
              ) {
                pkgManager = "pnpm";
              }


              exec(
                `${pkgManager === 'yarn' ? 'yarn add' : `${pkgManager} i`} @defer/client@${deferDesiredVersion}; ${pkgManager}`,
                { cwd },
                (err, stdout) => {
                  if (err) {
                    reject(`${cwd}: ${err}`);
                  } else {
                    console.log(`-------------- ${cwd}: Finished \n${stdout}`);
                    resolve();
                  }
                }
              );
            })
        )
      );
    })
    // .then(null, errors => errors.map(console.error));
    .then(null, (errors) => console.error(errors));
})();
