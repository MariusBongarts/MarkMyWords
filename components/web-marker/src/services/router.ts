export type RouteListener = (relUrl: string) => void;
export type Unsubscribe = () => void;
export class Router {
  private listeners: RouteListener[] = [];
  private rootPath = '/';

  constructor() {
    window.onpopstate = () => this.notifyListeners();
    document.addEventListener('click', (event: MouseEvent) => {
      if (!this.shouldIgnoreEvent(event)) {
        const anchor = this.getAnchor(event); // a-Element ermitteln
        if (anchor && !this.shouldIgnoreAnchor(anchor)) { // nur interne Links
          event.preventDefault();
          this.navigate(anchor.pathname + anchor.search + anchor.hash);
        }
      }
    });
    if (document.getElementsByTagName('base').length > 0) {
      this.rootPath = document.getElementsByTagName('base')[0].getAttribute('href')!;
    }
  }

  subscribe(listener: RouteListener): Unsubscribe {
    this.listeners.push(listener);
    return () => { // unsubscribe function
      this.listeners = this.listeners.filter(other => other !== listener);
    };
  }

  navigateExternal(url: string, newTab?: boolean) {
    window.open(url);
  }

  navigate(relUrl: string) {
    history.pushState(null, '', this.withRootPath(relUrl));
    this.notifyListeners();
  }

  // e. g. 'user/sign-in' (without leading slash)
  getPath() {
    const test = this.withoutRootPath(location.pathname).split('?')[0];
    return this.withoutRootPath(location.pathname).split('?')[0];
  }

  getParams(): { key: string, value: string } | null {
    const url = location.href;
    if (url.includes('?')) {
      const path = url.split('?');
      const params = path[1].split('=');
      const key = params[0];
      const value = params[1];
      return { key, value };
    } else {
      return null;
    }
  }

  private notifyListeners() {
    const path = this.getPath();
    this.listeners.forEach(listener => listener(path));
  }

  private shouldIgnoreEvent(event: MouseEvent) {
    return (event.defaultPrevented || event.button !== 0 ||
      (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey));
  }

  private getAnchor(event: MouseEvent): HTMLAnchorElement {
    for (const target of event.composedPath ? event.composedPath() : []) {
      if (this.isAnchor(target as HTMLElement)) {
        return target as HTMLAnchorElement;
      }
    }
    let elem: any = event.target;
    while (elem && !this.isAnchor(elem)) {
      elem = elem.parentNode;
    }
    return (elem && this.isAnchor(elem)) ? elem : null;
  }

  private isAnchor(elem: HTMLElement) {
    return elem.nodeName && elem.nodeName.toLowerCase() === 'a';
  }

  private shouldIgnoreAnchor(anchor: HTMLAnchorElement) {
    if (anchor.target && anchor.target.toLowerCase() !== '_self') {
      return true; // it has a non-default target
    }

    if (anchor.hasAttribute('download')) {
      return true;
    }

    if (this.withRootPath(anchor.pathname) === window.location.pathname && anchor.hash !== '') {
      return true; // target URL is a fragment on the current page
    }

    const origin = anchor.origin || this.getAnchorOrigin(anchor);
    if (origin !== window.location.origin) {
      return true; // target is external to the app
    }
  }

  private getAnchorOrigin(anchor: HTMLAnchorElement) {
    const port = anchor.port;
    const protocol = anchor.protocol;
    const defaultHttp = protocol === 'http:' && port === '80';
    const defaultHttps = protocol === 'https:' && port === '443';
    const host = (defaultHttp || defaultHttps) ? anchor.hostname : anchor.host;
    return `${protocol}//${host}`;
  }

  private withRootPath(relURL: string) {
    return relURL.startsWith(this.rootPath) ? relURL : this.rootPath + relURL;
  }

  private withoutRootPath(relURL: string) {
    if (relURL.startsWith(this.rootPath)) {
      return relURL.substring(this.rootPath.length);
    } else {
      return relURL;
    }
  }
}

export const router = new Router();
