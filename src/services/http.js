import axios from "axios";

import config from "../config";

import { isEmpty as isObjectEmpty } from "../utils/object";

import { CONTENT_TYPE_JSON } from "../constants/misc";

import authHeader from "./authHeader";

const authHeaderJson = authHeader();
/**
 * Axios instance for contactManagerHttp.
 */
export const contactManagerHttp = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": CONTENT_TYPE_JSON,
    Accept: CONTENT_TYPE_JSON,
    ...authHeaderJson,
  },
});

/**
 * Axios instance for contactManagerHttp.
 */
export const contactManagerPostHttp = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    "Content-Type": "multipart/form-data",
    ...authHeaderJson,
  },
});

/**
 * Response interceptor for axios instance.
 *
 * @returns {Object}
 */
contactManagerHttp.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (isObjectEmpty(error.response)) {
      throw { data: error };
    }

    throw error.response;
  }
);
