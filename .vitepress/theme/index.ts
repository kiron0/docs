import DefaultTheme from "vitepress/theme";
import NullScriptPlayground from "../components/NullScriptPlayground.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("NullScriptPlayground", NullScriptPlayground);
  },
};
