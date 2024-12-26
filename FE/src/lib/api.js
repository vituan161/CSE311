import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7215/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const login = async (email, password) => {
  try {
    const response = await apiClient.post("/User/login", null, {
      params: { email: email, password: password },
      headers: { Accept: "*/*" },
    });

    if (response.status === 200) {
      console.log("Token:", response.data.accessToken);
      localStorage.setItem("jwt", response.data.accessToken);
      localStorage.setItem("user", true);
      getProfile(response.data.accessToken);
      return response.data;
    }
  } catch (error) {
    console.error("Login failed:", error);
    console.log("Error:", error.response);
    throw error;
  }
};

const getProfile = async (token) => {
  try {
    const response = await apiClient.get("/Profiles/GetMyProfile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data;
  } catch (error) {
    console.error("Get profile failed:", error);
    console.log("Error:", error.response);
    throw error;
  }
};

export { login, getProfile };
export default login;
