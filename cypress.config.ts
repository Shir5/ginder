import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "ohngb1",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false,
  },
});
