export const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "/api";

export const API_PATHS = {
  AUTH: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    GET_PROFILE: "auth/profile",
  },
  SESSIONS: {
    GET_ALL: "sessions/my-sessions",
    CREATE: "sessions/create",
    GET_BY_ID: (id) => `sessions/${id}`,
    DELETE: (id) => `sessions/${id}`,
  },
  AI: {
    GENERATE_QUESTIONS: "ai/generate-questions",
    GENERATE_EXPLAINATION: "ai/generate-explaination",
  },
  TOGGLE_QUESTION: {
    PIN: (id) => `questions/${id}/pin`,
  },
  QUESTION: {
    ADD_TO_SESSION: "questions/add",
  },
};
