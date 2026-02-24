import axios from "@/utils/axios";

const actions = {
  async findAllUsers({ commit }) {
    const result = await axios({
      method: "GET",
      url: "users",
    });
    return result.data;
  },

  async createUser({ commit }, user) {
    const result = await axios({
      method: "POST",
      url: "users",
      data: user,
    });
    return result.data;
  },

  async updateUser({ commit }, dados) {
    const result = await axios({
      method: "PATCH",
      url: `users/${dados.id}`,
      data: dados.membro,
    });
    return result.data;
  },

  async deleteUser({ commit }, id) {
    const result = await axios({
      method: "DELETE",
      url: `users/${id}`,
    });
    return result.data;
  },

  async userInfo() {
    const id  = localStorage.getItem('@id');
    const result = await axios({
      method: 'GET',
      url: `users/${id}`
    });
    return result.data;
    // const token = localStorage.getItem("@jwt");

    // if (!token || !token.split(".")[1]) {
    //   localStorage.clear();
    //   return null;
    // }

    // const base64Url = token.split(".")[1];
    // const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    // const jsonPayload = decodeURIComponent(
    //   window
    //     .atob(base64)
    //     .split("")
    //     .map(function (c) {
    //       return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    //     })
    //     .join("")
    // );

    // return await JSON.parse(jsonPayload);
  },
};

export default {
  actions,
};
