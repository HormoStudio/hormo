declare const window: any;

import './index.scss';
import React from 'react';
import {render} from 'react-dom';
import { SoaProvider, createStore } from 'react-soa';
import { addToConsole } from 'react-soa/dist/console';
import { registerResizeFixer } from 'services/libs/resize-fix';
import { browserPersist as soaPersist } from "react-soa/dist/snapshot";
import { createNavigation, NavProvider } from "components/react-van/index";
import { browserPersist as navPersist } from "components/react-van/snapshot";
import { backOnEscape } from "components/react-van/event-escape";
import { App } from 'app';
import { Routes } from 'services/routes';

Object.defineProperty(Object.prototype, 'css', {
  value: function () {
    return Object.keys(this).filter(a => !!a && a !== 'null' && a !== 'undefined' && this[a]).join(' ');
  }
});
(async () => {
  registerResizeFixer();
  const store = createStore();
  const nav = createNavigation(Routes.login.login);
  soaPersist(store, localStorage.getItem('roomvu-data'), (data) => localStorage.setItem('roomvu-data', data));
  if (process.env.NODE_ENV === 'production') {
  } else {
    navPersist(nav, localStorage.getItem('roomvu-head'), (data) => localStorage.setItem('roomvu-head', data));
    addToConsole(store);
    backOnEscape(nav);
    window.nav = nav;
  }
  await store.invokeLinear('applicationLoaded');
  const app = <SoaProvider store={store}>
    <NavProvider context={nav}>
      <App/>
    </NavProvider>
  </SoaProvider>;
  const root = document.getElementById('root');
  root.innerHTML = '';
  render(app, root);
})()