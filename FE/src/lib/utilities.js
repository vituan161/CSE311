import { getProfile, putProfile } from "./api";
import { setToken, resetToken } from "../Store/feature/TokenSlide";
import { resetProfile, setFirstName, setLastName, setAddress, setDoB, setPhone, setRating, setIdentiticationNumber, setDescription, setImageURL } from "../Store/feature/ProfileSlide";
import { resetAccount, setRole, setUserName, setEmail, setIsOfficial } from "../Store/feature/AccountSlide";
const handleToken = async (token, dispatch) => {
    dispatch(setToken(token));
};

const handleGetProfile = async (token, dispatch) => {
    try {
        const response = await getProfile(token);
        dispatch(setFirstName(response.firstName));
        dispatch(setLastName(response.lastName));
        dispatch(setAddress(response.address));
        dispatch(setImageURL(response.imageURL));
        dispatch(setDoB(response.doB));
        dispatch(setPhone(response.phoneNumber));
        dispatch(setRating(response.rating));
        dispatch(setIdentiticationNumber(response.identiticationNumber));
        dispatch(setDescription(response.description));
        handleGetAccount(response.appUser, dispatch);
    } catch (error) {
        window.alert("Get profile failed");
    }
}

const handleGetAccount = async (account, dispatch) => {
    try {
        dispatch(setRole(account.role));
        dispatch(setUserName(account.userName));
        dispatch(setEmail(account.email));
        dispatch(setIsOfficial(account.isOfficial));
    } catch (error) {
        window.alert("Get account failed");
    }
}

const handlePutProfile = async (token, dispatch, profile) => {
    try {
        console.log("post profile");
        console.log(profile);
        console.log(token);
        const response = await putProfile(token, profile);
        dispatch(setFirstName(profile.FirstName));
        dispatch(setLastName(profile.LastName));
        dispatch(setAddress(profile.Address));
        dispatch(setImageURL(profile.ImageURL));
        dispatch(setDoB(profile.DoB));
        dispatch(setPhone(profile.PhoneNumber));
        dispatch(setRating(profile.rating));
        dispatch(setIdentiticationNumber(profile.IdentiticationNumber));
        dispatch(setDescription(profile.Description));
    } catch (error) {
        window.alert("Set profile failed");
    }
}

const logout = async (dispatch) => {
    dispatch(resetToken());
    dispatch(resetProfile());
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
}

export { handleToken, handleGetProfile, handlePutProfile, logout };
export default handleGetProfile;