import { firebase } from "../firebase";

const USERS = 'https://us-central1-hack20-52610.cloudfunctions.net/widgets/users';
/**
 * get the preliminary user info: {
 *  username: string,
 *  icon: string,
 *  uid: string,
 * }
 */
export const getUserInfo = async (uid: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options = fetchOptions('GET', token);
  const response = await fetch(`${USERS}/${uid}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

/**
 * Creates a new user with a given uid, username, and icon. Will return the
 * user info on creation.
 */
export const createUser = async (uid: string, username: string, icon: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('POST', token);
  options.body = JSON.stringify({info:{uid, username, icon}});

  const response = await fetch(`${USERS}/`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export const updateTags = async (uid: string, tags: any) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('PATCH', token);
  options.body = JSON.stringify({tags});

  const response = await fetch(`${USERS}/${uid}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export const sendFriendReq = async (uid: string, toUid: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('POST', token);

  const response = await fetch(`${USERS}/${uid}/requests/send?toUid=${toUid}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export const acceptFriendReq = async (uid: string, fromUid: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('POST', token);

  const response = await fetch(`${USERS}/${uid}/requests/accept?fromUid=${fromUid}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export const joinEvent = async (uid: string, eventId: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('POST', token);

  const response = await fetch(`${USERS}/${uid}/events/join?event=${eventId}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

export const leaveEvent = async (uid: string, eventId: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('POST', token);

  const response = await fetch(`${USERS}/${uid}/events/leave?event=${eventId}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

// returns an array of all events that the user is currently in
// each element in the array looks like: {
//    uid: string;
//    slots: string[] (icons);
//    createdBy: string (uid of creator);
//    username: string (of creator);
//    name: string;
// }
export const getRecents = async (uid: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('GET', token);

  const response = await fetch(`${USERS}/${uid}/events/recents`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

// returns the given uid's friend requests in the from of:
// [incoming requests array , outgoing requests array]
//
// each request looks like: {
//  username: string;
//  icon: string;
//  uid: string;
//}
//  
export const getFriendRequests = async (uid: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('GET', token);

  const response = await fetch(`${USERS}/${uid}/requests`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

// returns the list of friends from the user sorted based on interest.
// each element in the array looks like : {
//  icon: string;
//  tags: string -> number json obj
//  username: string;
//  uid: stirng;
//}
export const getFriends = async (uid: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('GET', token);

  const response = await fetch(`${USERS}/${uid}/friends`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

const fetchOptions = (method: string, idToken :string) => (
  {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
    },
  }
);