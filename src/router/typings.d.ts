import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    icon?: string;
    locale?: string;
    // menu select key
    menuSelectKey?: string;
  }
}
