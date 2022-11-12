const defObj = []

export const defaultObj = (state=defObj ,type) =>{
   return state
}

export const setCodeValue = (state="",action)=>{

   if(action.type === "SET_VALUE"){
      return action.code
   }

   return state
}