import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {
    try{
    console.log("REGISTER PLUGIN");
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: true,
      name: PLUGIN_ID,
    });

    app.customFields.register({
      name: "dynamicBrandLines",
      pluginId: PLUGIN_ID,
      type: "string",
      intlLabel: {
        id: "parent-child.dynamicBrandLines.label",
        defaultMessage: "Dynamic Brand Lines",
      },
      intlDescription: {
        id: "parent-child.dynamicBrandLines.description",
        defaultMessage: "Select a brand to filter lines",
      },
      components: {
        Input: async () => import('./components/DynamicBrandLines/Input'),
      },
    });
    app.customFields.register({
      name: "brandSelect",
      pluginId: PLUGIN_ID,
      type: "string",
      intlLabel: {
        id: "parent-child.brandSelect.label",
        defaultMessage: "Dynamic Brand",
      },
      intlDescription: {
        id: "parent-child.brandSelect.description",
        defaultMessage: "Select a brand to filter lines",
      },
      components: {
        Input: async () => import('./components/BrandSelect/Input'),
      },
    });
  } catch (error) {
    console.error("Error in plugin register:", error);
  }
  },

  bootstrap() {
    console.log("PLUGIN BOOTSTRAPPED");
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
