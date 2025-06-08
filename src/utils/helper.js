export const  validateEmail=(email)=>{
    const regex=/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    return regex.test(email)
}

export const  validatePassword=(password)=>{
    const regex=/^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/
    return regex.test(password)
}

export const getInitials=(name)=> {
    if (!name) return "";
  
    const words = name.trim().split(" ");
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
  
    return (words[0][0] + words[1][0]).toUpperCase();
  }