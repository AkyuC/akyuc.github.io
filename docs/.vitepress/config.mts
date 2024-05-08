import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Chu's Blog",
  description: "个人博客",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About Me', link: '/about' },
      { text: 'Blog', link: '/blog' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AkyuC' }
    ]
  }
})
