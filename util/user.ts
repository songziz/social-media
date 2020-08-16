export class User {
  username : string;
  friends : string[];
  events : string[];
  tags : any;
  icon : string;
  friendRequests : [string[], string[]] // 2 string arrays, first is outgoing, 2nd incoming
  uid : string;

  constructor(username: string, friends : string[], events : string[],
    tags : any, icon : string, friendRequests : [string[], string[]], uid: string) {
      this.username = username;
      this.friends = friends;
      this.events = events;
      this.tags = tags;
      this.icon = icon;
      this.friendRequests = friendRequests;
      this.uid = uid;
    }
}