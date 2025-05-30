export const  validateEmail=(email)=>{
    const regex=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return regex.test(email)
}

export const  validatePassword=(password)=>{
    const regex=/^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/
    return regex.test(password)
}