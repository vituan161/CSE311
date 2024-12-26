import { getProfile } from "./api";
import { setToken } from "../Store/feature/TokenSlide";
import { setFirstName, setLastName, setAddress, setDoB, setPhone, setRating, setIdentiticationNumber, setDescription } from "../Store/feature/ProfileSlide";

const handleToken = (token, dispatch) => {
    dispatch(setToken(token));
};

const handleGetProfile = async (token, dispatch) => {
    try {
        console.log(token);
        const response = await getProfile(token);
        console.log(response);
        dispatch(setFirstName(response.firstName));
        dispatch(setLastName(response.lastName));
        dispatch(setAddress(response.address));
        dispatch(setDoB(response.dob));
        dispatch(setPhone(response.phone));
        dispatch(setRating(response.rating));
        dispatch(setIdentiticationNumber(response.identificationNumber));
        dispatch(setDescription(response.description));
    } catch (error) {
        window.alert("Get profile failed");
    }
}

const handleSetProfile = async (e) => {
    e.preventDefault();
    try {
        dispatch(setFirstName(response.firstName));
        dispatch(setLastName(response.lastName));
        dispatch(setAddress(response.address));
        dispatch(setDoB(response.dob));
        dispatch(setPhone(response.phone));
        dispatch(setRating(response.rating));
        dispatch(setIdentiticationNumber(response.identificationNumber));
        dispatch(setDescription(response.description));
    } catch (error) {
        window.alert("Set profile failed");
    }
}

export { handleToken, handleGetProfile, handleSetProfile };
export default handleGetProfile;