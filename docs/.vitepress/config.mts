import { defineConfig } from 'vitepress'
import { navItems } from './nav.ts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Chu's Blog",
  description: "个人博客",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: navItems,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/AkyuC' }
    ]
  }
})
