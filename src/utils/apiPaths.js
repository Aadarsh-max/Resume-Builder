export const BASE_URL = "http://localhost:8000";

//utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", //SignUp
        LOGIN: "/api/auth/login", //login
        GET_PROFILE: "/api/auth/profile", //get logged in user details
    },

    RESUME: {
        CREATE: "/api/resume", //create a new resume
        GET_ALL: "/api/resume", //get resume
        GET_BY_ID: (id) => `/api/resume/${id}`, //to get a specific resume
        UPDATE: (id) => `/api/resume/${id}`, //update resume
        DELETE: (id) => `/api/resume/${id}`,
        UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`, //upload thumbnail and resume profile picture
    },

    /*IMAGE: {
        UPLOAD_IMAGE: "api/auth/upload-image",
    },*/
};