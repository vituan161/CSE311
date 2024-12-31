import { getProfile, putProfile } from "./api";
import { setToken, resetToken } from "../Store/feature/TokenSlide";
import { resetProfile, setFirstName, setLastName, setAddress, setDoB, setPhone, setRating, setIdentiticationNumber, setDescription, setImageURL } from "../Store/feature/ProfileSlide";
import { resetAccount, setRole, setUserName, setEmail, setIsOfficial, setFollowId } from "../Store/feature/AccountSlide";
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
        if (response.appUser > 0)
            handleGetAccount(response.appUser, dispatch);
    } catch (error) {
        window.alert("Get profile failed");
    }
}

const handleGetAccount = async (account, dispatch) => {
    try {
        console.log(account);
        dispatch(setRole(account.role));
        dispatch(setUserName(account.userName));
        dispatch(setEmail(account.email));
        dispatch(setIsOfficial(account.isOfficial));
        dispatch(setFollowId(account.follow.id));
    } catch (error) {
        window.alert("Get account failed");
    }
}

const handlePutProfile = async (token, dispatch, profile) => {
    try {
        const response = await putProfile(token, profile);
        handleGetProfile(token, dispatch);
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