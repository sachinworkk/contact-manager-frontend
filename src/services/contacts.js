import { contactManagerHttp, contactManagerPostHttp } from "./http";

import endpoints from "../constants/endpoints";

/**
 * Function to fetch all the contacts.
 *
 * @returns {Promise}
 */
export const fetchAllContacts = () => {
  const url = endpoints.CONTACTS;

  return contactManagerHttp.get(url);
};

/**
 * Function to fetch the contact id.
 *
 * @returns {Promise}
 */
export const fetchContactFromId = (id) => {
  const url = endpoints.CONTACTS + id;

  return contactManagerHttp.get(url);
};

export const fetchAllContactsType = () => {
  const url = endpoints.CONTACTS_TYPE;

  return contactManagerHttp.get(url);
};

export const postContact = (contactInfo) => {
  const url = endpoints.CONTACTS;

  return contactManagerPostHttp.post(url, contactInfo);
};

export const editContact = (contactInfo, id) => {
  const url = endpoints.CONTACTS + id;

  return contactManagerPostHttp.put(url, contactInfo);
};

export const deleteContact = (id) => {
  const url = endpoints.CONTACTS + id;

  return contactManagerPostHttp.delete(url);
};
