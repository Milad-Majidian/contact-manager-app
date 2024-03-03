import axios from 'axios'
const SERVER_URL = 'http://localhost:9000'


export function getAllContacts() {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url)
}
export function getContact(contactId) {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url)
}

// @desc Get All Groups
// @route Get http://localhost:9000/groups
export function getAllGroups() {
    const url = `${SERVER_URL}/groups`;
    return axios.get(url)
}

export function getGroup(groupId) {
    const url = `${SERVER_URL}/groups/${groupId}`
    return axios.get(url)
}

export function createContact(contact) {
    const url = `${SERVER_URL}/contacts`
    return axios.post(url, contact)
}

export function updateContact(contact, contactId) {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.put(url, contact)
}

export function deleteContact(contactId) {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.delete(url)
}  