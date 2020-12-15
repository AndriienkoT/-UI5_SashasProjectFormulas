window["sap-ui-config"] = {
  libs: "sap.m",
  theme: "sap_belize",
  resourceRoots: {
    "SashasProject": "app",
    'test': './test',
    'test.unit': './',
    'test.opa': './'
  },
  themeRoots: {
  },
  preload: "sync",
  manifestFirst: true,
  bindingSyntax: "complex",
  compatVersion: "edge",
  debug: false,
  logLevel: "NONE",
  trace: false,
  statistics: false,
  weinreId: "",
  weinreServer: "",
  "xx-debugModuleLoading": true,
  "xx-debugRendering": true,
  "xx-fakeOS": "",
  "xx-showLoadErrors": true,
  "xx-waitForTheme": true
};
