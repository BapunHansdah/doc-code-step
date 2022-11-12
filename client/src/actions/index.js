export function setValue(value,id){

	return{
		type:"SET_VALUE",
		code:value,
		file_id:id
	}

}



export function addNewFolder(){

	return{
		type:"ADD_NEW_FOLDER",
	}

}
