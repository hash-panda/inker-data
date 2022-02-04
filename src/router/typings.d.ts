import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    icon?: string;
    locale?: string;
    keepAlive?: boolean;
    // menu select key
    menuSelectKey?: string;
  }
}
