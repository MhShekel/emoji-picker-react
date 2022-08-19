const path = require('path');
const glob = require('glob');
const { dirname } = require('path');
const { writeJSONSync } = require('fs-extra');

const matches = glob.sync('./src/**/*.ts?(x)', {
  cwd: './',
  absolute: false,
  ignore: [`**/__tests__/**/*`]
});

const paths = matches.reduce((paths, file) => {
  const basename = path.basename(file, path.extname(file));

  paths[basename] = [file];

  return paths;
}, {});

writeJSONSync('./tsconfig.json', tesConfigTemplate(paths), {
  spaces: 2
});

function tesConfigTemplate(paths = {}) {
  return {
    // see https://www.typescriptlang.org/tsconfig to better understand tsconfigs
    include: ['src', 'types'],
    compilerOptions: {
      module: 'esnext',
      lib: ['dom', 'esnext'],
      importHelpers: true,
      // output .d.ts declaration files for consumers
      declaration: true,
      // output .js.map sourcemap files for consumers
      sourceMap: true,
      // match output dir to input dir. e.g. dist/index instead of dist/src/index
      rootDir: './src',
      // stricter type-checking for stronger correctness. Recommended by TS
      strict: true,
      // linter checks for common issues
      noImplicitReturns: true,
      noFallthroughCasesInSwitch: true,
      // noUnused* overlap with @typescript-eslint/no-unused-vars, can disable if duplicative
      noUnusedLocals: true,
      noUnusedParameters: true,
      // use Node's module resolution algorithm, instead of the legacy TS one
      moduleResolution: 'node',
      // transpile JSX to React.createElement
      jsx: 'react',
      // interop between ESM and CJS modules. Recommended by TS
      esModuleInterop: true,
      // significant perf increase by skipping checking .d.ts files, particularly those in node_modules. Recommended by TS
      skipLibCheck: true,
      // error out if import and file system have a casing mismatch. Recommended by TS
      forceConsistentCasingInFileNames: true,
      // `tsdx build` ignores this option, but it is commonly used when type-checking separately with `tsc`
      noEmit: true,
      paths
    }
  };
}
