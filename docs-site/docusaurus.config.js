// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SpliceRun Docs',
  tagline: 'Managed hosting for n8n: how it works, and what to do when it does not',
  favicon: 'img/favicon-placeholder.svg',

  future: {
    v4: true,
  },

  url: 'https://docs.splicerun.com',
  baseUrl: '/',

  noIndex: true,

  organizationName: 'SpliceRun',
  projectName: 'community',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/SpliceRun/community/edit/main/docs-site/',
          routeBasePath: '/',
          showLastUpdateTime: false,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
        },
      }),
    ],
  ],

  plugins: [
    [
      // Redirects for older URLs (the former /docs/ prefix and reorganised sections).
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {from: '/docs', to: '/'},
          {from: '/docs/getting-started', to: '/getting-started'},
          {from: '/docs/getting-started/setup', to: '/getting-started/setup'},
          {from: '/docs/hosting', to: '/plans'},
          {from: '/docs/hosting/choosing-a-plan', to: '/plans/choosing-a-plan'},
          {from: '/docs/hosting/what-we-manage', to: '/plans/what-we-manage'},
          {from: '/docs/hosting/shared-hosting', to: '/plans/shared-hosting'},
          {from: '/docs/hosting/dedicated-server', to: '/plans/dedicated-server'},
          {
            from: '/docs/hosting/bring-your-own-server',
            to: '/plans/bring-your-own-server',
          },
          {
            from: '/docs/hosting/outbound-connections',
            to: '/networking/outbound-connections',
          },
          {from: '/docs/hosting/custom-domains', to: '/networking/custom-domains'},
          {
            from: '/docs/hosting/migrating-to-splicerun',
            to: '/apps/n8n/migrate-an-existing-n8n',
          },
          {
            from: '/docs/hosting/backups-and-recovery',
            to: '/data/backups-and-recovery',
          },
          {
            from: '/docs/hosting/exporting-your-data',
            to: '/apps/n8n/export-your-data',
          },
          {
            from: '/docs/hosting/how-pricing-works',
            to: '/billing/how-pricing-works',
          },
          {from: '/docs/policies', to: '/billing'},
          {
            from: '/docs/policies/cancellation-data-policy',
            to: '/billing/cancellation-data-policy',
          },
          {from: '/docs/security', to: '/security'},
          {from: '/security/audit-trail', to: '/security/activity-trail'},
          {from: '/docs/security/data-and-access', to: '/security/data-and-access'},
          {from: '/docs/troubleshooting', to: '/troubleshooting'},
          {
            from: '/docs/troubleshooting/custom-domain-ssl',
            to: '/troubleshooting/custom-domain-ssl',
          },
          {
            from: '/docs/troubleshooting/n8n-slow-high-cpu',
            to: '/apps/n8n/slow-or-high-cpu',
          },

          // Apps got their own section; older URLs still land on the right page.
          {
            from: '/data/migrating-to-splicerun',
            to: '/apps/n8n/migrate-an-existing-n8n',
          },
          {
            from: '/data/migrating-from-pikapods',
            to: '/apps/n8n/migrate-from-pikapods',
          },
          {from: '/data/exporting-your-data', to: '/apps/n8n/export-your-data'},
          {
            from: '/account/reset-your-n8n-password',
            to: '/apps/n8n/reset-your-password',
          },
          {
            from: '/troubleshooting/n8n-slow-high-cpu',
            to: '/apps/n8n/slow-or-high-cpu',
          },
          {
            from: '/troubleshooting/community-nodes',
            to: '/apps/n8n/community-nodes',
          },
        ],
      },
    ],
    [
      // Installable, offline-readable docs.
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          {tagName: 'link', rel: 'manifest', href: '/manifest.json'},
          {tagName: 'meta', name: 'theme-color', content: '#121211'},
          {tagName: 'meta', name: 'apple-mobile-web-app-capable', content: 'yes'},
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black-translucent',
          },
        ],
      },
    ],
  ],

  themes: [
    [
      // Local, build-time search index; no reader data goes to a third party.
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/',
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 60,

        // Needed because noIndex above would otherwise leave the search index empty.
        forceIgnoreNoIndex: true,

        // The /docs/* tree is redirect stubs only.
        ignoreFiles: [/^docs(\/|$)/],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'SpliceRun Docs',
        items: [
          {to: '/getting-started/quickstart', label: 'Quickstart', position: 'left'},
          {to: '/plans', label: 'Hosting plans', position: 'left'},
          {to: '/troubleshooting', label: 'Troubleshooting', position: 'left'},
          {
            href: 'https://splicerun.com/pricing',
            label: 'Pricing',
            position: 'right',
          },
          {
            href: 'https://app.splicerun.com',
            label: 'Dashboard',
            position: 'right',
            className: 'navbar__item--cta',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Start here',
            items: [
              {label: 'Quickstart', to: '/getting-started/quickstart'},
              {label: 'Setup guide', to: '/getting-started/setup'},
              {label: 'Choosing a plan', to: '/plans/choosing-a-plan'},
              {label: 'What we manage', to: '/plans/what-we-manage'},
              {label: 'Apps', to: '/apps'},
            ],
          },
          {
            title: 'Running your instance',
            items: [
              {label: 'Outbound connections', to: '/networking/outbound-connections'},
              {label: 'Backups & recovery', to: '/data/backups-and-recovery'},
              {label: 'Export your n8n data', to: '/apps/n8n/export-your-data'},
              {label: 'Troubleshooting', to: '/troubleshooting'},
            ],
          },
          {
            title: 'Money & policy',
            items: [
              {label: 'How pricing works', to: '/billing/how-pricing-works'},
              {
                label: 'Billing, cancellation & data',
                to: '/billing/cancellation-data-policy',
              },
              {label: 'Data and access', to: '/security/data-and-access'},
            ],
          },
          {
            title: 'SpliceRun',
            items: [
              {label: 'Dashboard', href: 'https://app.splicerun.com'},
              {label: 'Pricing', href: 'https://splicerun.com/pricing'},
              {label: 'Managed n8n', href: 'https://splicerun.com/managed/n8n'},
              {label: 'Contact', href: 'https://splicerun.com/contact'},
            ],
          },
        ],
        copyright: `Documentation licensed under CC BY 4.0. The SpliceRun name and hosted service are not covered by that licence.`,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'yaml', 'json'],
      },
    }),
};

export default config;
