import React, { useState, useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import Folders from "./files";
import { Data } from "./Data";
import Modal from "react-modal";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbSquareToggle } from "react-icons/tb";
import { RiEditBoxFill } from "react-icons/ri";
import { AiFillFolderOpen } from "react-icons/ai";
import { ImCloudDownload } from "react-icons/im";
import { AiFillRead} from "react-icons/ai";
import { RiBookReadFill } from "react-icons/ri";
import { BiEdit} from "react-icons/bi";
import { BiSave } from "react-icons/bi";
import { MdAddBox } from "react-icons/md";
import _ from "lodash"
import ReactMarkdown from 'react-markdown'



Modal.setAppElement("#root");

function Main() {
  const [step, setStep] = useState(()=>{
    console.log(JSON.parse(localStorage.getItem('step')))
    return JSON.parse(localStorage.getItem('step')) || Data
  }); //1
  const [count, setCount] = useState(1);  //2
  const [stepselect, setStepSelect] = useState(0);  //3
  const [modal, setModal] = useState(false);  //4
  const [stepData, setStepData] = useState({});  //5
  const [exploreData, setExploreData] = useState(step[0].data || Data[0].data);  //6
  const [exploreContain, setExploreContain] = useState([]);  //7
  const [exploreContainCode, setExploreContainCode] = useState("");  //8
  const [ExploreContainName, setExploreContainName] = useState("");  //9
  const [noteData,setNoteData] =useState("")  //10
  const [isEditing, setIsEditing] = useState(false);  //11
  const [editId, setEditId] = useState(null);  //12
  const [newFileId, setNewFileId] = useState(null);  //13
  const [fileSelectedId, setFileSelectedId] = useState(1);  //14
  const [codeValue, setCodeValue] = useState("");  //15
  const [fileContainCode, setFileContainCode] = useState("");  //16
  const [editedName, setEditedName] = useState("");  //17
  const [isNewFile, setIsNewFile] = useState("");  //18
  const [updatedPath, setUpdatePath] = useState("");  //19
  const [fileSelectedName, setFileSelectedName] = useState("");  //20
  const [currentCode, setCurrentCode] = useState("");  //21
  const [readonly, setReadOnly] = useState(true);  //22
  const [isSaved, setIsSaved] = useState(true);  //23
  const [paths, setPaths] = useState("");  //24
  const [willImportfile, setWilImportFile] = useState(false);  //25

  const [showEditor, setShowEditor] = useState(false);  //26
  const [showNavBar, setShowNavBar] = useState(false);  //27
  const [sideBarTab, setSidebarTab] = useState(false);  //28
  const [showNote, setShowNote] = useState(true);  //29
  const [ fileExtension,setFileExtension] = useState("javascript")  //30
  const [languages,setLanguages] = useState()  //31
  const [notes,setNotes] = useState("")  //32
  const [showtextEditor,setShowtextEditor] = useState(false)  //33
  const editorRef = useRef(null);  //34
  const[isfileSelected,setIsfileSelected] = useState(false)



  // useEffect(()=>{
  //   const getData = JSON.parse(localStorage.getItem('step')) || Data
  //   setStep()
  // },[])

   useEffect(()=>{
      console.log("saved to localStorage")
       localStorage.setItem('step',JSON.stringify(step))       
  },[step,exploreData,exploreContain,ExploreContainName,noteData,isSaved])


  function addStep(e) {
    e.preventDefault();
    
    const add_steps = [
      ...step,
      {
        ...stepData,
        step: step.length,
        notes:"",
        data: {
          id: 0,
          name: "root",
          parent_id: null,
          path: "root",
          isFolder: true,
          code: null,
          contains: willImportfile ? _.cloneDeep(exploreContain) : [],
        },
      },
    ];
    setStep(add_steps);
    setCount(step.length + 1);
    setModal(false);
    setSidebarTab(true);
  }

  function deleteStep() {
    if (step.length !== 0) {
      const add_steps = step.filter((s) => s.step !== step.length - 1);
      setStep(add_steps);
      setCount(step.length- 1);
      if (stepselect === step.length - 1) {
        setStepSelect(step.length - 2);
      }
    } else {
      console.log("there is no step left!!");
      return;
    }
  }


  function stepSelected(select) {
    setStepSelect(select);
    setStepData(step[select]);
    setExploreData(step[select].data);
    setExploreContain(step[select].data.contains);
    setEditedName("");
    setShowtextEditor(false)
    setNoteData(step[stepselect].notes)
    setIsfileSelected(false)
    saveCode();
    setPaths("")
    setFileSelectedName("")
  }





  // useEffect(()=>{

  //    const getSteps = );
  //    setStep(getSteps || Data)
     
  // },[])


 

 
  function newfile(){
    setStep(Data)
    localStorage.removeItem('step')
  }
  

  function saveCode() {
    console.log('saved')
    setIsSaved(true);
    setEditId(null);
    setIsEditing(false);
    function exp(explore) {
      const code = explore.contains.map((m, i) => {
        if (fileSelectedId == m.id) {
          setExploreContainCode(m.code = codeValue);
        }
      });
      // setExploreContainCode(code)

      explore.contains &&
        explore.contains.map((m) => {
          exp(m);
        });
    }
    exp(exploreData);
  }

   function setValue(value, id, name, path) {

    saveCode();
    setIsfileSelected(true)
    setCodeValue(value);
    setFileSelectedId(id);
    setFileSelectedName(name);
    setPaths(path);
      languages && languages.map(l=>{
              if(l.extensions && l.extensions.includes('.'+name.split('.').pop())){
                setFileExtension(l.id)
              }
          })

  }

  function handleChange(e) {
    setCodeValue(e);

    if (window.event.type !== "message") {
      setIsSaved(false);
    }
  }

  function openModal() {
    setSidebarTab(false);
    setModal(true);
  }

  function closeModal(e) {
    e.preventDefault();
    setModal(false);
  }

  function importdata() {
    setWilImportFile(!willImportfile);
  }

  function addHandleChange(e) {
    setStepData({ ...stepData, [e.target.name]: e.target.value });
  }

  

  function createNewHandle(id, e) {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    setEditId(id);
    setEditedName("");
    setIsNewFile(true)
    // setIsfileSelected(false)
  }

  function EditHandle(id, e, name) {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    setEditedName(name);
    setEditId(id);
  }


  function addNewFolder(p_id, e, name, path) {
    const newId = new Date();
    function exp(explore) {
      if (explore.id === p_id) {
        setExploreContain(
          explore.contains.push({
            id: newId,
            parent_id: p_id,
            path: path,
            name: "",
            isFolder: true,
            contains: [],
            code: null,
          })
        );
      }
      explore.contains &&
        explore.contains.map((m) => {
          exp(m);
        });
    }
    exp(exploreData);
    setNewFileId(newId);
    createNewHandle(newId, e);
  }


  function addNewFile(p_id, e, name, path) {
    const newId = new Date();
    function exp(explore) {
      if (explore.id === p_id) {
        setExploreContain(
          explore.contains.push({
            id: newId,
            parent_id: p_id,
            path: path,
            name: "",
            isFolder: false,
            contains: [],
            code: "",
          })
        );
      }
      explore.contains &&
        explore.contains.map((m) => {
          exp(m);
        });
    }
    exp(exploreData);
    setNewFileId(newId);
    createNewHandle(newId, e);
    setFileSelectedName("")
  }
  

  function deleteFileDir(id, index) {
    function exp(explore) {
      if (explore.id === id) {
        setExploreContain(explore.contains.splice(index, 1));
      }
      explore.contains &&
        explore.contains.map((m) => {
          exp(m);
        });
    }
    exp(exploreData);
    setEditedName("")
    setPaths("")
    setFileSelectedName("")
  }


  function renameFileDir(id, p_id, index, editedName, e) {
    e.preventDefault();
    e.stopPropagation();
    setEditId(null);
    setIsEditing(false);
    function exp(explore) {
      const rename = explore.contains.map((m, i) => {
        if (id == m.id) {
          setExploreContainName((m.name = editedName));
          if(isNewFile){
             setPaths((m.path = m.path + "/" + editedName));
             setValue("", id, editedName, m.path)
           }
        }
      });

      explore.contains &&
        explore.contains.map((m) => {
          exp(m);
        });
    }
    exp(exploreData);
    setEditedName("")
  }




  function handleEditorDidMount(editor, monaco) {
    // editorRef.current = editor;
    // editor.addCommand(
    //   monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS ,
    //   function (){
    //     saveCode()
    //   }
    // )
    // // editor.addAction({
    // //   id: "executeCurrentAndAdvance",
    // //   label: "Execute Block and Advance",
    // //   keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
    // //   contextMenuGroupId: "2_execution",
    // //   run: () => {
    // //     saveCode()
    // //   },
    // // });
    setLanguages(monaco.languages.getLanguages())

  }



    function editCode() {
    setReadOnly(!readonly);
  }

  function textEditor(){
    setShowtextEditor(!showtextEditor)
    setNotes(step[stepselect].notes)
  }


  async function showFile(e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      setStep(JSON.parse(e.target.result));
    };
    reader.readAsText(e.target.files[0]);
  }

  function handleNoteInput(e){
      setNotes(e.target.value)
      updateNote(e.target.value)
  }

  function updateNote(e){
      step.map((m,i)=>{
        if(m.step === stepselect){
          setNoteData(m.notes = e)
        }
      })
  }


  // console.log(step,noteData,notes)

  function showEditorTab() {
    setShowEditor(true);
  }

  function showFileTab() {
    setShowEditor(false);
  }

  function navBar() {
    setShowNavBar(!showNavBar);
  }

  function sideBar() {
    setSidebarTab(!sideBarTab);
  }

  function toggleNotes(){
    setShowNote(!showNote)
  }

  function showtextNoteTab() {
    setShowtextEditor(true)
    setNotes(step[stepselect].notes)
    setNoteData(step[stepselect].notes)
  }

  function showtextEditorTab() {
    setShowtextEditor(false)
  }



  return (
    <>
      <div className="max-w-full bg-gray-900  overflow-y-scroll ">
        <div className="flex md:grid-cols-2 shadow bg-black relative">
{/*--------------------------------- left bar ----------------------------------*/}
          <div
            className={`overflow-y-scroll z-10 bg-black bg-opacity-90 h-screen md:w-2/12 w-6/12 ${
              !sideBarTab ? "-left-[900px]" : "left-0"
            } absolute md:static z-10 transition-all`}
          >
            {step && step.map((s, ind) => {
              return (
                <div
                  key={s.step}
                  onClick={() => stepSelected(s.step)}
                  className={`flex justify-between p-2 items-center ${
                    stepselect !== s.step ? "bg-gray-900" : "bg-orange-500"
                  } cursor-pointer m-1`}
                >
                  <h1 className="text-2xl text-white  font-black">{`STEP ${s.step}`}</h1>
                </div>
              );
            })}
            <div className="flex flex-row justify-center m-1 gap-1">
              <button
                onClick={openModal}
                className="w-full text-white  rounded bg-green-500 hover:bg-green-400"
              >
                +
              </button>
              <button
                onClick={deleteStep}
                className={`w-full text-white rounded ${
                  step.length === 1 ? "bg-red-200" : "bg-red-500"
                } hover:bg-red-400`}
                disabled={step.length=== 1 ? true : false}
              >
                -
              </button>
            </div>
          </div>
{/*----------------------------------modal-------------------------------*/}
          <Modal
            className="max-w-[400px] mt-20 mx-auto bg-orange-500 rounded"
            isOpen={modal}
          >
            <form className="flex flex-col p-5 gap-2" onSubmit={addStep}>
              <input
                onChange={addHandleChange}
                name="title"
                className="p-2"
                placeholder="title"
                required={true}
              />
              <textarea
                onChange={addHandleChange}
                name="description"
                className="p-2"
                placeholder="description"
                required={true}
              />
              <div className="flex gap-2 items-center text-white">
                <input
                  type="checkbox"
                  name="import"
                  checked={willImportfile}
                  onChange={importdata}
                />
                <label htmlFor="import">
                  <span>import files from selected step</span>
                </label>
              </div>
              <button className="p-2 bg-black text-white">save</button>
              <button
                className="p-2 bg-red-700 text-white"
                onClick={closeModal}
              >
                cancel
              </button>
            </form>
          </Modal>
{/*---------------------------------rightbar--------------------------------------------*/}
          <div className="flex flex-col w-full md:w-10/12 pl-1">
            <div className="bg-gray-900 p-3 flex justify-between w-full">
{/*----------------------------------short description section---------------------------------*/}
              <div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {step[stepselect].title}
                  </h1>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {step[stepselect].description}
                  </p>
                </div>
              </div>
{/*----------------------------------short description section---------------------------------*/}

{/*-----------------------------------mobile side tab opener----------------------------*/}
              <div>
                <div
                  className="flex justify-center md:hidden"
                  onClick={sideBar}
                >
                  <div className={` ${sideBarTab ? "text-orange-500" : "text-white"} font-semibold text-5xl`}><TbSquareToggle/></div>
                </div>
              </div>
            </div>
{/*---------------------------options-------------------------------------------------*/}
            <div className="p-2 bg-gray-800 flex gap-2">
                   <button className="px-2 py-1 text-xs text-white hover:text-orange-500" onClick={newfile}><div className="flex items-center"><MdAddBox/>&nbsp; new</div></button>
                   <label
                        htmlFor="file-upload"
                        className="custom-file-upload px-2 py-1 text-white hover:text-orange-500 text-xs px-2"
                      >
                        <div className="flex items-center"><AiFillFolderOpen/> &nbsp;open file </div>
                      </label>
                      <input
                        className="text-xs"
                        id="file-upload"
                        type="file"
                        name="file-upload"
                        onChange={(e) => showFile(e)}
                      />
                      <a
                            download="filename.json"
                            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                              JSON.stringify(step)
                            )}`}
                            className="text-white hover:text-orange-500 text-xs px-2 py-1"
                          >
                            <div className="flex items-center"><ImCloudDownload/> &nbsp; download</div>
                      </a>
                   <button className="px-2 py-1 text-xs bg-white text-black hover:bg-orange-500" onClick={toggleNotes}>{ showNote ?"open note":"open code"}</button>
            </div>
{/*------------------------------options-----------------------------------------------------*/}
{/*---------------------------------mobile tab section-------------------------------------------*/}
            <div className="block md:hidden">
              <div className="text-white grid grid-cols-2 justify-center gap-2 ">
                <div
                  className={`p-2 ${!showNote ? showtextEditor ? "" : "bg-orange-700"  : showEditor ? "" : "bg-orange-700"} `}
                  onClick={!showNote ? showtextEditorTab : showFileTab}
                >
                  {!showNote ?"notes":"file"}
                </div>
                <div
                  className={`p-2 ${!showNote ? showtextEditor ? "bg-orange-700":""  : showEditor ? "bg-orange-700" : ""} `}
                  onClick={!showNote ? showtextNoteTab : showEditorTab}
                >
                  {!showNote ?"text-editor":"code-editor"}
                </div>
              </div>
            </div>
{/*---------------------------------mobile tab section --------------------------------------------*/}
           <div className={showNote ? 'block': 'hidden'}>
            <div className={`flex grid-cols-2`}>

{/*------------------------------explorer section --------------------------------------------------------*/}
              <div
                className={`bg-[#3d3d3d]  h-[85vh] w-full md:w-64 overflow-auto resize-x ${
                  showEditor ? "hidden" : ""
                } md:block`}
              >
                <div className="font-bold text-white bg-black p-1 shadow border-r text-sm">
                  Files
                </div>
                <div className="p-1">
                  {
                    <Folders
                      setValue={setValue}
                      fileSelectedId={fileSelectedId}
                      editedName={editedName}
                      setEditedName={setEditedName}
                      exploreData={exploreData}
                      isEditing={isEditing}
                      EditHandle={EditHandle}
                      setEditId={setEditId}
                      editId={editId}
                      setIsEditing={setIsEditing}
                      addNewFile={addNewFile}
                      deleteFileDir={deleteFileDir}
                      addNewFolder={addNewFolder}
                      renameFileDir={renameFileDir}
                    />
                  }
                </div>
              </div>
{/*----------------------------explorer section--------------------------------------------------------*/}

{/*-------------------------code editor section ---------------------------------------------------------*/}
              <div
                className={`bg-black w-full overflow-auto ${
                  !showEditor ? "hidden" : ""
                } md:block overflow-clip`}
              >
                <div className="flex p-1 justify-between">
                  <div className="text-white pl-5 flex items-center">
                    <div className="flex gap-2 items-center text-xs">
                      {"/" + paths.slice(0,paths.lastIndexOf('/')) +"/"+fileSelectedName}
                      <div
                        className={`w-2 h-2 rounded-full flex items-center ${
                          isSaved ? "" : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/*editor option desktop*/}
                  <div className="hidden md:block">
                    <div className="text-white hover:text-orange-500 pr-5 flex gap-2">                      
                      <button
                        onClick={editCode}
                        className="text-white hover:text-orange-500 px-2 text-sm"
                      >
                        {!readonly ? <div className="flex items-center gap-1"><AiFillRead/>read</div> : <div className="flex items-center gap-1"><BiEdit/>edit</div>}
                      </button>
                      <button
                        onClick={saveCode}
                        className="text-white hover:text-orange-500 px-2 text-sm"
                      >
                        <div className="flex gap-1 items-center"><BiSave/>save</div>
                      </button>
                    </div>
                  </div>
                {/*editor option mobile*/}
                  <div className="block md:hidden text-white relative">
                    <div className="flex items-center" onClick={navBar}>
                      <GiHamburgerMenu size={20} />
                    </div>
                    <div className={!showNavBar ? "hidden" : "block"}>
                      <div className="right-0 w-44 bg-black z-10 absolute flex items-center justify-center">
                        <div className="text-white p-3 flex-col flex gap-2 gap-2 w-full justify-center items-center">
                          <button
                            onClick={editCode}
                            className="bg-orange-700 text-white  w-full px-2  flex justify-center text-sm"
                          >
                        {!readonly ? <div className="flex items-center gap-1"><AiFillRead/>read</div> : <div className="flex items-center gap-1"><BiEdit/>edit</div>}
                          </button>
                          <button
                            onClick={saveCode}
                            className="bg-orange-700 text-white  w-full px-2  flex justify-center text-sm"
                          >
                        <div className="flex gap-1 items-center"><BiSave/>save</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/*<EditorContainer>*/}
                <div className="h-[80vh]">
                 {
                  
                  !isfileSelected ? <div className="text-white flex justify-center items-center h-full font-bold text-2xl">No file selected</div>
                  :
                  <Editor
                    id="editor"
                    height="100%"
                    language={fileExtension}
                    theme="vs-dark"
                    onChange={handleChange}
                    value={codeValue}
                    onMount={handleEditorDidMount}
                    options={{ readOnly: readonly }}
                  />
                }
                </div>
              </div>
{/*----------------------------------------editor setion ---------------------------------------------*/}

            </div>
            </div>
{/*--------------------------------------note section-------------------------------------------------------------*/}
            <div className={`${showNote ? 'hidden': 'block'}  text-white`}>
                  <div className="font-bold text-white bg-black p-1 shadow border-r text-sm">
                {!showtextEditor?"Notes":"Editor"}
                  </div>
                  <div className="h-[80vh] overflow-y-scroll mx-auto relative">
                   <div className="h-full bg-black">
                      {/*notes*/}
                       <div className={`${!showtextEditor?"hidden":"block"}`}><textarea className="w-full text-white bg-[#2d2d2d] h-[80vh] p-3 border-none" value={notes} onChange={handleNoteInput}></textarea></div>
                       {/*note editor*/}
                       <div className={`${showtextEditor?"hidden":"block"} text-white p-3 bg-[#1b1b1b]  h-[80vh]`}><ReactMarkdown>{step[stepselect].notes}</ReactMarkdown></div>
                   </div>
                   <span onClick={textEditor} className="fixed right-10 cursor-pointer hidden md:block bottom-10">{!showtextEditor ? <RiEditBoxFill size={40}/>:<RiBookReadFill size={39}/>}</span>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
