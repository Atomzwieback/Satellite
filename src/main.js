import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueClipboard from 'vue-clipboard2';
import vClickOutside from 'v-click-outside';
import config from '@/config/config';
import Database from '@/classes/database/Database.ts';
import Threads from '@/classes/database/textile/Threads.ts';
import ThreadDB from '@/classes/database/textile/threads/ThreadDB.ts';
import WebRTC from '@/classes/webrtc/WebRTC.ts';
import VueI18n from 'vue-i18n';

import i18nInit from './utils/i18n';
import App from './App';
import router from './router/index.ts';
import store from './store/index.ts';
import StreamManager from './classes/webrtc/StreamManager.ts';

Vue.config.productionTip = false;

Vue.use(VueClipboard);
Vue.use(vClickOutside);
Vue.use(VueI18n);

sync(store, router);

window.Satellite = {
  debugEnabled: config.debug,
  /* eslint-disable */
  debug: (...args) => {
    if (window.Satellite.debugEnabled) {
      // eslint-disable-next-line no-console
      console.log(
        `%c [Satellite Debug]: ${args[0]}`,
        "color: #9b59b6; font-weight: bold; font-family: 'Major Mono Display', monospace;",
        ...args.slice(1, args.length)
      );
    }
  },
  warn: (...args) => {
    if (window.Satellite.debugEnabled) {
      // eslint-disable-next-line no-console
      console.log(
        `%c [Satellite Warn]: ${args[0]}`,
        "color: #e67e22; font-weight: bold; font-family: 'Major Mono Display', monospace;",
        ...args.slice(1, args.length)
      );
    }
  },
  error: (...args) => {
    // eslint-disable-next-line no-console
    console.log(
      `%c [Satellite Error]: ${args[0]}`,
      "color: #e74c3c; font-weight: bold; font-family: 'Major Mono Display', monospace;",
      ...args.slice(1, args.length)
    );
  },
  /* eslint-enable */
};

Vue.prototype.$database = new Database('SatelliteData');
Vue.prototype.$Threads = new Threads();
Vue.prototype.$ThreadDB = new ThreadDB();
Vue.prototype.$WebRTC = new WebRTC();
Vue.prototype.$pin = null;

const constraints = {
  audio: {
    autoGainControl: false,
    channelCount: 2,
    echoCancellation: true,
    latency: 0,
    noiseSuppression: false,
    sampleRate: 96 * 1000,
    sampleSize: 24,
    volume: 1.0,
  },
};
Vue.prototype.$streamManager = new StreamManager(constraints);

const i18n = i18nInit('en_US');

/* eslint-disable */
new Vue({
  el: '#app',
  functional: true,
  router,
  store,
  i18n,
  render(h) {
    return h(App);
  },
});
/* eslint-enable */
