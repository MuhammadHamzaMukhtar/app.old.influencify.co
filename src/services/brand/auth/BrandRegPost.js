import axios from "axios";
const BrandsLogin = async data => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BASE_URL + "/api/v1/login",
      data
    );

    return response;
  } catch (error) {
    return error.response;
  }
};
const BrandVerification = async userId => {
  try {
    const response = await axios.get("/api/v1/brand-login/" + userId);

    return response;
  } catch (error) {
    return error.response;
  }
};
const HandleRegisterBrands = async query => {
  try {
    const response = await axios.post("/api/v1/register-brand", query);
    return response;
  } catch (error) {
    return error.response;
  }
};
export { BrandsLogin, BrandVerification, HandleRegisterBrands };
