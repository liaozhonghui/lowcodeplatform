import { createStore } from 'vuex';
import app from "./modules/app";
import admin from "./modules/admin";
import { Store } from 'vuex';
import { State } from '../types/store';

const debug = import.meta.env.MODE == 'development' ? true : false;

export default createStore({
  modules: {
    app,
    admin
  },
  strict: debug
}) as Store<State>;
