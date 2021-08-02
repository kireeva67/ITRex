"use strict";

class Users {
  constructor(numberOfUsers) {
    this.numberOfUsers = numberOfUsers;
  }

  async getUsers() {
    let url = `https://randomuser.me/api/?results=${this.numberOfUsers}`;
    let usersData = await this.makeGetRequest(url);
    let users = "";

    usersData["results"][0] =
      this.formatingUserData(usersData["results"][0]) + "\n\n";
    users = usersData["results"].reduce((user1, user2) => {
      user2 = this.formatingUserData(user2);
      return user1 + user2 + "\n\n";
    });
    return users;
  }

  async makeGetRequest(url) {
    let response = await fetch(url);
    if (response.ok) {
      let json = await response.json();
      return json;
    } else {
      return false;
    }
  }

  formatingUserData(user) {
    let userInfo = `Gender: ${user["gender"]}\nName: ${user["name"]["first"]} ${user["name"]["last"]}\nEmail: ${user["email"]}\nPhone: ${user["phone"]}\nLocation: ${user["location"]["country"]}, ${user["location"]["city"]}`;
    return userInfo;
  }
}

const result = new Users(3);
console.log(await result.getUsers());
