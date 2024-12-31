import axios from "axios";

const apiClientJson = axios.create({
  baseURL: "https://localhost:7215/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiClientForm = axios.create({
  baseURL: "https://localhost:7215/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const login = async (email, password) => {
  try {
    const response = await apiClientJson.post("/User/login", null, {
      params: { email: email, password: password },
      headers: { Accept: "*/*" },
    });

    if (response.status === 200) {
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
    const response = await apiClientJson.get("/Profiles/GetMyProfile", {
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

const putProfile = async (token, profile) => {
  try {
    const formData = new FormData();
    formData.append("FirstName", profile.FirstName);
    formData.append("LastName", profile.LastName);
    formData.append("Address", profile.Address);
    formData.append("PhoneNumber", profile.PhoneNumber);
    formData.append("DoB", profile.DoB);
    formData.append("Description", profile.Description);
    formData.append("IdentiticationNumber", profile.IdentiticationNumber);
    if (profile.Images && profile.Images.length > 0) {
      profile.Images.forEach((image) => {
        formData.append("Images", image);
      });
    }
    console.log(formData);
    const response = await apiClientForm.put("/Profiles", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.alert("Update successfully");
    return response.data;
  }
  catch (error) {
    console.error("Post profile failed:", error);
    console.log("Error:", error.response);
    window.alert("Update profile failed");
    throw error;
  }
};

export { login, getProfile,putProfile };
export default login;
