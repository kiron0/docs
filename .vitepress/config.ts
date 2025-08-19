import { defineConfig } from "vitepress";

export default defineConfig({
  title: "NullScript",
  description:
    "A fun parody programming language that transpiles to JavaScript",

  base: "/",
  srcDir: "src",

  appearance: true,
  cleanUrls: true,

  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["link", { rel: "apple-touch-icon", href: "/logo.png" }],
    [
      "meta",
      { name: "algolia-site-verification", content: "81DBB8D28A8F7E23" },
    ],
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

    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-NXS0RYNB3C",
      },
    ],
    [
      "script",
      {},
      `
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-NXS0RYNB3C');
      `,
    ],
  ],

  themeConfig: {
    search: {
      provider: "algolia",
      options: {
        appId: "Z8O1Z6YXR3",
        apiKey: "8047e0cf23cdf8639ec18c6ef7dcac4b",
        indexName: "nullscript",
      },
    },

    logo: {
      src: "/logo.png",
      alt: "NullScript Logo",
    },

    nav: [
      { text: "Guide", link: "/guide/introduction" },
      { text: "Examples", link: "/examples/basic" },
      { text: "Playground", link: "/playground" },
      { text: "Reference", link: "/reference/keywords" },
      { text: "Community", link: "/community/faq" },
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
          text: "Migration & Compatibility",
          items: [
            { text: "Migration Guide", link: "/guide/migration" },
            {
              text: "JavaScript Compatibility",
              link: "/guide/javascript-compatibility",
            },
          ],
        },
        {
          text: "Development",
          items: [
            { text: "Best Practices", link: "/guide/best-practices" },
            { text: "Advanced Async Patterns", link: "/guide/async-patterns" },
            { text: "Module System", link: "/guide/modules" },
            { text: "Class System", link: "/guide/classes" },
          ],
        },
        {
          text: "IDE & Tooling",
          items: [
            { text: "VS Code Extension", link: "/guide/vscode-extension" },
            { text: "IDE Support", link: "/guide/ide-support" },
          ],
        },
      ],
      "/community/": [
        {
          text: "Community",
          items: [
            { text: "Contribute", link: "/community/contribute" },
            { text: "FAQ", link: "/community/faq" },
          ],
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
          items: [
            { text: "Keywords", link: "/reference/keywords" },
            { text: "Complete Syntax", link: "/reference/syntax" },
          ],
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
    ],
  },
});
