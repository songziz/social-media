import { firebase, storage } from "../firebase";

const ROOT_URL = 'https://us-central1-hack20-52610.cloudfunctions.net/widgets'
const USERS = `${ROOT_URL}/users`;
const EVENTS = `${ROOT_URL}/events`;

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

// updates the preference tags for a user
export const updateTags = async (uid: string, tags: any) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('PATCH', token);
  options.body = JSON.stringify({tags});

  const response = await fetch(`${USERS}/${uid}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

// sends a friend request from 'uid' to 'toUid'
export const sendFriendReq = async (uid: string, toUid: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('POST', token);

  const response = await fetch(`${USERS}/${uid}/requests/send?toUid=${toUid}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

// accepts the friend request from 'fromUid' to 'uid'
export const acceptFriendReq = async (uid: string, fromUid: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('POST', token);

  const response = await fetch(`${USERS}/${uid}/requests/accept?fromUid=${fromUid}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

// adds the user to the event and updates necessary dependencies
export const joinEvent = async (uid: string, eventId: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('POST', token);

  const response = await fetch(`${USERS}/${uid}/events/join?event=${eventId}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
}

// removes the user from the event and updates necessary dependencies
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

/**
 * returns an array of a user's created events
 */
export const getProfileEvents = async (uid: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('GET', token);

  const response = await fetch(`${USERS}/${uid}/events`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

// gets all of the event info for a specific event (for profile page)
// object looks like: {
//    createdBy: (uid of creator) string;
//    description: string;
//    image: string (url);
//    name: string;
//    postedOn: string (date string);
//    slots: string[] (uids)
//    tags:
//    username: string (of creator)
//    uid: string;
//  }
export const getEventInfo = async (eventId: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('GET', token);

  const response = await fetch(`${EVENTS}/${eventId}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

// creates an event and returns the event info following the pattern
// illustrated in the documentation above.
export const createEvent = async (username: string, name: string, desc: string) => {
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const options : any = fetchOptions('POST', token);
  options.body = JSON.stringify({event: {username, name, description: desc}});

  const response = await fetch(`${EVENTS}`, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

// returns the icons of the uids in the array passed in
export const getIcons = async (icons : string[]) => {
  if (icons.length === 0) {
    return [];
  }
  
  const token : string = await firebase.auth().currentUser!.getIdToken();

  const response = await fetch(
    `${USERS}/icons?icons=${JSON.stringify(icons)}`,
    fetchOptions('GET', token),
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  
  return await response.json();
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


export const getImg = async (url : string) => {
  var gsReference = storage.refFromURL(url);
  try {
    return await gsReference.getDownloadURL();
  } catch (error) {
    console.log(error);
  }


  // .then(function(url) {
  //   // Insert url into an <img> tag to "download"
  //   return url;
  // }).catch(function(error) {

  //   // A full list of error codes is available at
  //   // https://firebase.google.com/docs/storage/web/handle-errors
  //   console.log(error);
  // });
}