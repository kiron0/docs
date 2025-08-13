import DefaultTheme from "vitepress/theme";
import Playground from "../components/playground.vue";
import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Playground", Playground);
  },
};
