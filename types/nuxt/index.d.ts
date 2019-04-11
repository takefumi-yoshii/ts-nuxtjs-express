import Vue from "vue";
import * as Vuex from "vuex"
import * as Express from "express"
import { NuxtAxiosInstance } from "@nuxtjs/axios"
import VueRouter, { Route } from "vue-router";
import { Store } from "vuex";
import '@types/express-session'

// augment typings of NodeJS.Process
import "./process";

// augment typings of Vue.js
import "./vue";

type Dictionary<T> = { [key: string]: T };

type NuxtState = Dictionary<any>;

export interface Context {
  app: Vue;
  isClient: boolean;
  isServer: boolean;
  isStatic: boolean;
  isDev: boolean;
  isHMR: boolean;
  route: Route;
  store: Vuex.ExStore; // 前節で得られた、隅々までキャストされた Store型
  env: Dictionary<any>;
  params: Route['params'];
  query: Route['query'];
  req: Express.Request // Server に Express を利用している場合
  res: Express.Response // Server に Express を利用している場合
  $axios: NuxtAxiosInstance // Axios を利用している場合
  redirect(status: number, path: string, query?: Route['query']): void;
  redirect(path: string, query?: Route['query']): void;
  error(params: ErrorParams): void;
  nuxtState: NuxtState;
  beforeNuxtRender(
    fn: (params: {
      Components: VueRouter['getMatchedComponents']
      nuxtState: NuxtState
    }) => void
  ): void
}

export type Middleware = string | ((ctx: Context, cb: Function) => Promise<void> | void)

export interface Transition {
  name?: string;
  mode?: string;
  css?: boolean;
  duration?: number;
  type?: string;
  enterClass?: string;
  enterToClass?: string;
  enterActiveClass?: string;
  leaveClass?: string;
  leaveToClass?: string;
  leaveActiveClass?: string;
  beforeEnter?(el: HTMLElement): void;
  enter?(el: HTMLElement, done: Function): void;
  afterEnter?(el: HTMLElement): void;
  enterCancelled?(el: HTMLElement): void;
  beforeLeave?(el: HTMLElement): void;
  leave?(el: HTMLElement, done: Function): void;
  afterLeave?(el: HTMLElement): void;
  leaveCancelled?(el: HTMLElement): void;
}

export interface ErrorParams {
  statusCode?: number;
  message?: string;
}

export interface NuxtLoading extends Vue {
  fail?(): NuxtLoading;
  finish(): NuxtLoading;
  increase?(num: number): NuxtLoading;
  pause?(): NuxtLoading;
  start(): NuxtLoading;
}

export interface NuxtApp extends Vue {
  $loading: NuxtLoading;
  isOffline: boolean;
  isOnline: boolean;
}
