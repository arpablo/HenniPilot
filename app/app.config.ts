export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'zinc'
    },
    pageHero: {
      slots: {
        container: 'flex flex-col lg:grid py-8 sm:py-10 lg:py-12 gap-16 sm:gap-y-24'
      }
    },
    pageSection: {
      slots: {
        container: 'flex flex-col lg:grid py-8 sm:py-12 lg:py-16 gap-8 sm:gap-16'
      }
    }
  },
  seo: {
    siteName: 'Nuxt Docs Template'
  },
  header: {
    title: 'Schwarzes Gold',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/nuxt-ui-templates/docs/edit/main/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/nuxt/ui',
        target: '_blank'
      }, {
        icon: 'i-lucide-book-open',
        label: 'Nuxt UI docs',
        to: 'https://ui.nuxt.com/docs/getting-started/installation/nuxt',
        target: '_blank'
      }]
    }
  }
})
