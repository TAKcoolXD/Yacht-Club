export const currentEnv = "dev";
const env = {
  //测试
  local: {
    baseURL: "https://dptest.azhuquq.com",
    imgBaseUrl: "",
  },
  dev: {
    baseURL: "https://dpyt.cjpco.cn",
    imgBaseUrl: "",
  },
  //正式
  prod: {
    baseURL: "https://dpyt.cjpco.cn",
    imgBaseUrl: "",
  },
};
const config = env[currentEnv];
config.env = currentEnv;
config.uploadUrl = "";
config.primaryColor = "#4781fe";
config.defaultColor = "#333";

export const imagePath = () => { return config.baseURL };
export const api = config.baseURL;
export const imgBaseUrl = config.imgBaseUrl;
export const baseURL = config.baseURL;
export const primaryColor = config.primaryColor;
export const defaultColor = config.defaultColor;
export const uploadUrl = config.uploadUrl;
export const ERR_OK = 200;
export default config;