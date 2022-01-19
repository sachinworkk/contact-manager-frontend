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

export const fetchAllContactsType = () => {
  const url = endpoints.CONTACTS_TYPE;

  return contactManagerHttp.get(url);
};

export const postContact = (contactInfo) => {
  const url = endpoints.CONTACTS;

  return contactManagerPostHttp.post(url, contactInfo);
};
