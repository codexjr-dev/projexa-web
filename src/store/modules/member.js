import axios from "@/utils/axios";

const actions = {
  async findAllMembers({ commit }) {
    try {
      const result = await axios({
        method: "GET",
        url: "member",
      });
      return result.data;
    } catch (err) {
      const errorMessage = err.response.data.error;

      isBadToken(errorMessage)
        ? console.log(err.response.data.error) || localStorage.clear()
        : null; // To inspect, you can change null by console.log(res)

      return err.response;
    }
  },

  async createMember({ commit }, member) {
    const result = await axios({
      method: "POST",
      url: "member",
      data: member,
    });
    return result.data;
  },

  async updateMember({ commit }, dados) {
    const result = await axios({
      method: "PATCH",
      url: `member/${dados.id}`,
      data: dados.membro,
    });
    return result.data;
  },

  async deleteMember({ commit }, id) {
    const result = await axios({
      method: "DELETE",
      url: `member/${id}`,
    });
    return result.data;
  },
};

function isBadToken(errorMessage) {
  return [
    "Token inválido.",
    "Usuário não existe.",
    "Token mal formatado.",
  ].includes(errorMessage);
}

export default {
  actions,
};
