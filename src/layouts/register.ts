import { App } from "vue";

/**
 * Register layouts in the app instance
 *
 * @param {App<Element>} app
 */
export function registerLayouts(app: App<Element>) {
  const layouts = import.meta.glob("./*.vue", { eager: true });

  Object.entries(layouts).forEach(([, layout]: any) => {
    app.component(layout?.default?.name, layout?.default);
  });
}
