import { defineConfig } from "vitepress";

export default defineConfig({
  title: "NullScript",
  description:
    "A fun parody programming language that transpiles to JavaScript",
  base: "/",
  appearance: true,
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["link", { rel: "apple-touch-icon", href: "/logo.png" }],
    // Open Graph / Facebook
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      {
        property: "og:title",
        content: "NullScript - JavaScript with Attitude",
      },
    ],
    [
      "meta",
      {
        property: "og:description",
        content:
          "A fun parody programming language that transpiles to JavaScript",
      },
    ],
    ["meta", { property: "og:image", content: "/og-image.png" }],
    ["meta", { property: "og:url", content: "https://nullscript.js.org" }],
    // Twitter
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    [
      "meta",
      {
        name: "twitter:title",
        content: "NullScript - JavaScript with Attitude",
      },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content:
          "A fun parody programming language that transpiles to JavaScript",
      },
    ],
    ["meta", { name: "twitter:image", content: "/og-image.png" }],
  ],
  themeConfig: {
    logo: {
      src: "/logo.png",
      alt: "NullScript Logo",
      style: {
        borderRadius: "10%",
      },
    },
    nav: [
      { text: "Guide", link: "/guide/introduction" },
      { text: "Examples", link: "/examples/basic" },
      { text: "Playground", link: "/playground" },
      { text: "Reference", link: "/reference/keywords" },
      { text: "CLI", link: "/cli/usage" },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Introduction", link: "/guide/introduction" },
            { text: "Basic Concepts", link: "/guide/basic-concepts" },
          ],
        },
        {
          text: "Getting Started",
          items: [
            { text: "Installation", link: "/guide/installation" },
            { text: "Getting Started", link: "/guide/getting-started" },
          ],
        },
        {
          text: "Development",
          items: [{ text: "Best Practices", link: "/guide/best-practices" }],
        },
      ],
      "/examples/": [
        {
          text: "Examples",
          items: [
            { text: "Basic Examples", link: "/examples/basic" },
            { text: "Advanced Examples", link: "/examples/advanced" },
          ],
        },
      ],
      "/reference/": [
        {
          text: "Reference",
          items: [{ text: "Keywords", link: "/reference/keywords" }],
        },
      ],
      "/cli/": [
        {
          text: "CLI",
          items: [{ text: "Usage", link: "/cli/usage" }],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/nullscript-lang/nullscript" },
      { icon: "twitter", link: "https://twitter.com/hashtagkiron" },
    ],
  },
});
