import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '',
  title: "Chu's Blog",
  description: "Chu's Blog",
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
