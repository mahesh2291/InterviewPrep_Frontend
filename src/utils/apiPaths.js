export const BASE_URL=location.hostname==="localhost"? "http://localhost:3000" : "/api"
 
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
    },
    AI:{
        GENERATE_QUESTIONS:'/api/ai/generate-questions',
        GENERATE_EXPLAINATION:'/api/ai/generate-explaination'
    },
    TOGGLE_QUESTION:{
        PIN:(id)=>`api/questions/${id}/pin`
    },
    QUESTION:{
        ADD_TO_SESSION:'api/questions/add'
    },

}