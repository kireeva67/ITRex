"use strict";

class Users {
  constructor(numberOfUsers) {
    this.numberOfUsers = numberOfUsers;
  }

  async getUsers() {
    let url = `https://randomuser.me/api/?results=${this.numberOfUsers}`;
    let usersData = await this.makeGetRequest(url);
    let users = "";
    for (let key in usersData["results"]) {
      let user = this.formatingUserData(usersData["results"][key]);
      users += user + "\n\n";
    }
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
