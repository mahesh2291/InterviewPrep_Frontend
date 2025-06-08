export const BASE_URL="http://localhost:8000";

export const API_PATHS={
    AUTH:{
        REGISTER: "api/auth/register",
        LOGIN:"api/auth/login",
        GET_PROFILE:"api/auth/profile"
    },
    SESSIONS:{
        GET_ALL:"api/sessions/my-sessions",
        CREATE:"api/sessions/create",
        GET_BY_ID:(id)=>`api/sessions/${id}`,
        DELETE:(id)=>`api/sessions/${id}`
    }
}