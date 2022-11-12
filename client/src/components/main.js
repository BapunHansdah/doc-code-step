import React,{useState,useEffect, useRef } from 'react'
import Editor,{useMonaco } from "@monaco-editor/react";
import {AiOutlineClose} from 'react-icons/ai'
import {useSelector} from 'react-redux'
import Folders from './files'
import {Data} from './Data'
import Modal from 'react-modal'
import {GiHamburgerMenu} from 'react-icons/gi'
// import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";




Modal.setAppElement('#root')

function Main(){
    
    const [step,setStep] = useState(Data)
    const [count,setCount] = useState(1)
    const [stepselect,setStepSelect] = useState(0)
    const [modal,setModal] = useState(false)
    const [stepData,setStepData] = useState(Data[0])
    const [exploreData,setExploreData] = useState(Data[0].data)
    const [exploreContain,setExploreContain] = useState(Data[0].data.contains)
    const [exploreContainCode,setExploreContainCode] = useState(Data[0].data.contains[0].code)
    const [ExploreContainName,setExploreContainName] = useState("")
    const [isEditing,setIsEditing] = useState(false)
    const [editId,setEditId] = useState(null)
    const [newFileId,setNewFileId] = useState(null)
    const [fileSelectedId,setFileSelectedId] =useState(2)
    const [codeValue,setCodeValue] = useState(Data[0].data.contains[0].code)
    const [fileContainCode,setFileContainCode] = useState(Data[0].data.contains[0].code)
    const [editedName, setEditedName] = useState("")
    const [fileSelectedName, setFileSelectedName] = useState(Data[0].data.contains[0].name)
    const [currentCode,setCurrentCode] =useState("index.js")
    const [readonly,setReadOnly] = useState(true)
    const [isSaved,setIsSaved] = useState(true)
    const [paths,setPaths] = useState("root/index.js")
    const [willImportfile,setWilImportFile] = useState(false)

    const [showEditor , setShowEditor] = useState(false)





  const editorRef = useRef(null);
  // const monaco = useMonaco()
  // console.log(monaco)


    // const codeValue = useSelector(state=>state.setCodeValue)

    function addStep(e){
    	e.preventDefault()
    	console.log()
    	const add_steps = [...step,{...stepData,step:count,data:{id:0,name:'root',parent_id:null,'path':'/',isFolder:true,code:null,contains: willImportfile ? exploreContain : [] }}]
    	setStep(add_steps)
    	setCount(count+1)
    	setModal(false)
    }
   
    function deleteStep(){

    	if(count !== 0){
    		const add_steps = step.filter((s)=>s.step !== count-1)
    	    setStep(add_steps)
    	    setCount(count-1)
    	    if(stepselect === count-1){
    	    	setStepSelect(count-2)
    	    }

    	}else{
    		console.log("there is no step left!!")
    		return;
    	}
    }

    function stepSelected(select){
    	setStepSelect(select)
    	setStepData(step[select])
    	setExploreData(step[select].data)
    	setExploreContain(step[select].data.contains)
    	setEditedName("")

    }


    function handleChange(e){
    	  setCurrentCode(e)
    	  if(window.event.type !== 'message'){
    	  	setIsSaved(false)
    	  }
    	  
    }

    function saveCode(){
    	setIsSaved(true)
	    setEditId(null)
	    setIsEditing(false)
	 	function exp(explore){
	          
	        const code= explore.contains.map((m,i)=>{
	        	   if(fileSelectedId == m.id){
	               	  return m.code = currentCode
	               }

	         }) 
	         setExploreContainCode(code)

	      	 explore.contains && explore.contains.map(m=>{
	      	 	exp(m)
	      	 })
	      }
	      exp(exploreData)

    }

    // console.log(isSaved)

    // console.log(exploreContainCode)



    function openModal(){
    	setModal(true)
    }

    function closeModal(e) {
    	e.preventDefault()
    	setModal(false)
    }

    function addHandleChange(e){
    	setStepData({...stepData,[e.target.name]:e.target.value})
    }

  function EditHandle(id,e,name){
        e.preventDefault()
        e.stopPropagation()
        setIsEditing(true)
        setEditedName(name)
        setEditId(id)
    }

  function createNewHandle(id,e){
        e.preventDefault()
        e.stopPropagation()
        setIsEditing(true)
        setEditId(id)
        setEditedName("")
    }

  function setValue(value,id,name,path){
  	 saveCode()
     setCodeValue(value)
     setFileSelectedId(id)
     setFileSelectedName(name)
     setPaths(path)
  }

  function addNewFolder(p_id,e,name,path){
     const newId = new Date();	 
     function exp(explore){
      	 if(explore.id === p_id ){
      	   setExploreContain(explore.contains.push({'id':newId,'parent_id':p_id,'path':path,'name':'','isFolder':true,'contains':[],'code':null}))
      	 }
      	 explore.contains && explore.contains.map(m=>{
      	 	exp(m)
      	 })
      }
      exp(exploreData)
      setNewFileId(newId)
      createNewHandle(newId,e)

    }
  
           // if(monaco){
      //      	var myBinding = monaco.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, function() {
		    //    alert('SAVE pressed!');
		    // });

		    // var editor = monaco.editor.create(document.getElementById('editor'))

      //      }
    function editCode(){
    	setReadOnly(!readonly)
    }

           

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage

     editorRef.current = editor;
      editor.addAction({
                id: "executeCurrentAndAdvance",
                label: "Execute Block and Advance",
                keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
                contextMenuGroupId: "2_execution",
                run: () => {
                    saveCode()
                },
            });
  }
       


 function addNewFile(p_id,e,name,path){ 
      const newId = new Date();	 
     function exp(explore){
      	 if(explore.id === p_id ){
      	   setExploreContain(explore.contains.push({'id':newId,'parent_id':p_id,'path':path,'name':'','isFolder':false,'contains':[],'code':''}))
      	 }
      	 explore.contains && explore.contains.map(m=>{
      	 	exp(m)
      	 })
      }
      exp(exploreData)
      setNewFileId(newId)
      createNewHandle(newId,e)

    } 

 function deleteFileDir(id,index){

 	function exp(explore){

        if(explore.id === id ){
 		 setExploreContain(explore.contains.splice(index,1))
 		}
      	 explore.contains && explore.contains.map(m=>{
      	 	exp(m)
      	 })
      }
      exp(exploreData)


 }

 // console.log(exploreContain)

  function renameFileDir(id,p_id,index,editedName,e){
  	e.preventDefault()
    e.stopPropagation()
  	console.log(editedName)
    setEditId(null)
    setIsEditing(false)
 	function exp(explore){
          
        const rename= explore.contains.map((m,i)=>{
               if(id == m.id){
               	  // return m.name = editedName
                 setExploreContainName(m.name = editedName)
                 setPaths(m.path =m.path+"/"+editedName)

               }

         }) 

      	 explore.contains && explore.contains.map(m=>{
      	 	exp(m)
      	 })
      }
      exp(exploreData)
 }

    console.log(paths)

    function importdata(){
    	setWilImportFile(!willImportfile)
    }

    async function showFile(e) {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      setStep(JSON.parse(e.target.result))
    };
    reader.readAsText(e.target.files[0])
  }


 function showEditorTab(){
    setShowEditor(true)
 }

 function showFileTab(){
    setShowEditor(false)
 }

 console.log(showEditor)

	return(	
		<>
           <div className="max-w-full h-screen bg-lime-200">
              <div className="flex flex-col md:flex-row grid-cols-1 md:grid-cols-2 h-full shadow bg-black">
                {/*leftbar*/}
	           	   <div className="md:w-2/12 overflow-scroll scrollbar flex flex-row md:flex-col">
	           	     {
	           	     	step.map((s,ind)=>{
	           	     		return (
	           	                   <div key={s.step} onClick={()=>stepSelected(s.step)} className={`flex justify-between p-2 items-center ${stepselect !== s.step ? "bg-gray-900" : "bg-orange-500"} cursor-pointer m-1`}><h1 className="text-2xl text-white font-black">{`STEP ${s.step}`}</h1></div>
	           	     			)
	           	     	})
	           	     }
	           	      <div className="flex flex-row justify-center m-1 gap-1">
	           	         <button onClick={openModal} className=" w-5 md:w-full text-white rounded bg-green-500 hover:bg-green-400">+</button>
	           	         <button onClick={deleteStep} className={`w-5 md:w-full text-white rounded ${count ===1 ?"bg-red-200" : "bg-red-500"} hover:bg-red-400`} disabled={count ===1 ? true : false}>-</button>
	           	      </div>    
	           	   </div>
	           	   <Modal className="max-w-[400px] mt-20 mx-auto bg-orange-500 rounded" isOpen={modal}>
	           	       <form className="flex flex-col p-5 gap-2" onSubmit={addStep}>
	           	          <input onChange={addHandleChange} name='title' className="p-2" placeholder='title'/>
	           	          <textarea onChange={addHandleChange} name='description' className="p-2" placeholder='description'/>
	           	          <div className="flex gap-2 items-center text-white">
	           	          <input type="checkbox" name='import' checked={willImportfile} onChange={importdata} />
	           	          <label htmlFor='import'>
	           	             <span>import files from selected step</span>
	           	          </label>
	           	          </div>
	           	          <button className="p-2 bg-black text-white">save</button>
	           	          <button className="p-2 bg-red-700 text-white" onClick={closeModal}>cancel</button>
	           	       </form>
	           	   </Modal>
	           	   {/*rightbar*/}
	           	   <div className="md:w-10/12 pl-1">
	           	      <div className='bg-gray-900 p-3'>
	           	         <div><h1 className="text-2xl font-bold text-white">{step[stepselect].title}</h1></div>
	           	         <div><p className="text-sm text-gray-600">{step[stepselect].description}</p></div>
	           	      </div>
                      <div className="block md:hidden">
                      <div className="text-white grid grid-cols-2 justify-center gap-2 ">
                        <div className={`p-2 ${showEditor ? "":"bg-red-700"} `} onClick={showFileTab}>files</div>
                        <div className={`p-2 ${showEditor ? "bg-red-700":""}`} onClick={showEditorTab}>editor</div>
                      </div>
                      </div>
	           	      <div className="flex">
	           	      	 <div className={`bg-[#3d3d3d] w-full overflow-auto resize-x ${showEditor?"hidden":""} md:block`}>
	           	      	       <div className="font-bold text-white bg-black p-1 shadow border-r">Files</div>
	           	      	       <div className="p-1">  	
	           	      	       {          	      	       
	           	      	          <Folders setValue={setValue} fileSelectedId={fileSelectedId} editedName={editedName} setEditedName={setEditedName} exploreData={exploreData} isEditing={isEditing} EditHandle={EditHandle} setEditId={setEditId} editId={editId} setIsEditing={setIsEditing} addNewFile={addNewFile} deleteFileDir={deleteFileDir} addNewFolder = {addNewFolder} renameFileDir={renameFileDir}/>
	           	      	       }                  	      	       
	           	      	       </div>
	           	      	 </div>
	           	      	 <div className={`bg-black w-full overflow-auto ${!showEditor?"hidden":""} md:block`}>
	           	      	      <div className="flex p-1 justify-between">
	           	      	       <div className="text-white pl-5 flex items-center"><div className="flex gap-2 items-center text-xs">{'/'+paths}<div className={`w-2 h-2 rounded-full flex items-center ${isSaved? "":"bg-red-500"}`}></div></div></div>
	           	      	       <div className="hidden md:block">
                                   <div className="text-white pr-5 flex gap-2">
    	           	      	           {/*<button onClick={showFile} className="bg-gray-800 px-2 rounded">open</button>*/}
    	           	      	           <label htmlFor="file-upload" class="custom-file-upload bg-gray-800 px-2 rounded">
                                           open
                                       </label>
    	           	      	           <input className="text-sm" id="file-upload" type="file" name="file-upload" onChange={(e) => showFile(e)} />
    	           	      	           <button onClick={editCode} className="bg-gray-800 px-2 rounded">{!readonly?"Read" :"Edit"}</button>
    	           	      	           <button onClick={saveCode} className="bg-gray-800 px-2 rounded">Save</button> 
    	           	      	           <a download="filename.json"
    	           	      	                href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(step))}`}
    	           	      	                className="bg-gray-800 px-2 rounded">Download
    	           	      	            </a> 

    	           	      	       </div>
                               </div>
                               <div className="block md:hidden text-white pr-5 relative">
                                  <div className="flex items-center"><GiHamburgerMenu size={20}/></div>
                                  <div className="w-44 bg-black z-10 absolute flex justify-center">
                                      <div className="text-white pr-5 flex-col flex gap-2 gap-2 w-full justify-center items-center">
                                       <label htmlFor="file-upload" class="custom-file-upload w-full flex justify-center bg-gray-800 px-2 rounded">
                                           open
                                       </label>
                                       <input className="text-sm flex justify-center w-full" id="file-upload" type="file" name="file-upload" onChange={(e) => showFile(e)} />
                                       <button onClick={editCode} className="bg-gray-800 w-full px-2 rounded flex justify-center">{!readonly?"Read" :"Edit"}</button>
                                       <button onClick={saveCode} className="bg-gray-800 w-full px-2 rounded flex justify-center">Save</button> 
                                       <a download="filename.json"
                                            href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(step))}`}
                                            className="bg-gray-800 px-2 rounded w-full flex justify-center">Download
                                        </a> 
                                   </div>
                               
                                  </div>
                               </div>

	           	      	       </div>
	           	      	       <div className="">

	           	      	          {/*<EditorContainer>*/}
	           	      	                <Editor
	           	      	                     id="editor"
										     height="80vh"
										     defaultLanguage="javascript"
										     theme="vs-dark"
										     onChange={handleChange}
										     value={codeValue}
										     onMount={handleEditorDidMount}
										     options={{readOnly: readonly}}
								         />
	           	      	          {/*</EditorContainer>*/}
	           	      	       	  {/*<Editor
								     height="80vh"
								     defaultLanguage="javascript"
								     theme="vs-dark"
								     onChange={handleChange}
								     value={codeValue}
								   />*/}
	           	      	       </div>
	           	      	 </div>
	           	      </div>
	           	   </div>

           	   </div>
           </div>
		</>
	)
}

export default Main;