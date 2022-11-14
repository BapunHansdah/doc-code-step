import { useState } from "react";
import { AiFillFolder } from "react-icons/ai";
import { DiCode } from "react-icons/di";
import { FaFolderOpen } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";

// import {
//     setValue

// } from '../actions/index'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export default function Folders({
  exploreData,
  setValue,
  addNewFolder,
  setEditId,
  addNewFile,
  fileSelectedId,
  setCodeValue,
  deleteFileDir,
  index,
  renameFileDir,
  isEditing,
  setIsEditing,
  editId,
  EditHandle,
  editedName,
  setEditedName,
}) 

{
  const [expand, setExpand] = useState(false);
  const [currentEditedName, setCurrentEditedName] = useState("");
  const dispatch = useDispatch();

  function expandHandle() {
    setExpand(!expand);
  }
  function expandHandleOnCreate() {
    setExpand(true);
  }

  // setPath(exploreData.name)

  function handleChange(e) {
    e.preventDefault();
    e.stopPropagation();
    setEditedName(e.target.value);
  }



  return (

    <div className="relative">
    {/*file and Folders*/}
      <div className="text-white text-sm hover:bg-gray-500 px-2">
        {exploreData.isFolder ? (
          <ContextMenuTrigger id={`fd${exploreData.id}`}>
            <div onClick={isEditing ? expandHandleOnCreate : expandHandle}>
              <div>
                <div className="flex items-center gap-1 cursor-pointer">
                  {!expand ? <AiFillFolder /> :<FaFolderOpen/>}
                  <div
                    className={`font-medium ${
                      isEditing && editId === exploreData.id
                        ? "hidden"
                        : "block"
                    }`}
                  >
                    {exploreData.name}
                  </div>
                  <form
                    onSubmit={(e) =>
                      renameFileDir(
                        exploreData.id,
                        exploreData.parent_id,
                        index,
                        editedName,
                        e
                      )
                    }
                  >
                    <input
                      onChange={handleChange}
                      value={editedName}
                      name="edit"
                      className={`font-medium bg-black ${
                        isEditing && editId === exploreData.id
                          ? "block"
                          : "hidden"
                      } w-full`}
                    />
                  </form>
                </div>
              </div>
            </div>
          </ContextMenuTrigger>
        ) : (
          <ContextMenuTrigger id={`fl${exploreData.id}`}>
            <div>
              <div className="flex items-center gap-1 cursor-pointer">
                <DiCode />
                <div
                  onClick={() =>
                    setValue(
                      exploreData.code,
                      exploreData.id,
                      exploreData.name,
                      exploreData.path
                    )
                  }
                  className={`${
                    isEditing && editId === exploreData.id ? "hidden" : "block"
                  } w-full`}
                >
                  {exploreData.name}
                </div>
                <form
                  onSubmit={(e) =>
                    renameFileDir(
                      exploreData.id,
                      exploreData.parent_id,
                      index,
                      editedName,
                      e
                    )
                  }
                >
                  <input
                    onChange={handleChange}
                    value={editedName}
                    name="edit"
                    className={`bg-black ${
                      isEditing && editId === exploreData.id
                        ? "block"
                        : "hidden"
                    } w-full`}
                  />
                </form>
              </div>
            </div>
          </ContextMenuTrigger>
        )}

        <ContextMenu
          className="bg-[#2d2d2d] text-xs flex justify-start flex-col w-44 text-white  py-2 z-10"
          id={`fd${exploreData.id}`}
        >
          <MenuItem
            onClick={(e) => {
              addNewFile(exploreData.id, e, exploreData.name, exploreData.path);
              expandHandleOnCreate();
            }}
            className="px-4 py-1 hover:bg-black"
          >
            Create New File
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              addNewFolder(
                exploreData.id,
                e,
                exploreData.name,
                exploreData.path
              );
              expandHandleOnCreate();
            }}
            className="px-4  py-1 hover:bg-black"
          >
            Create New Folder
          </MenuItem>
          <MenuItem
            onClick={() => deleteFileDir(exploreData.parent_id, index)}
            className="px-4 py-1 hover:bg-black"
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={(e) => EditHandle(exploreData.id, e, exploreData.name)}
            className="px-4 py-1 hover:bg-black"
          >
            Rename
          </MenuItem>
        </ContextMenu>

        <ContextMenu
          className="bg-[#2d2d2d] text-xs flex justify-start flex-col w-44 text-white py-2 z-10"
          id={`fl${exploreData.id}`}
        >
          <MenuItem
            onClick={() => deleteFileDir(exploreData.parent_id, index)}
            className="px-4  py-1 hover:bg-black"
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={(e) => EditHandle(exploreData.id, e, exploreData.name)}
            className="px-4 py-1 hover:bg-black"
          >
            Rename
          </MenuItem>
        </ContextMenu>
      </div>
{/*containers*/}
      <div className={`${expand ? "block" : "hidden"} pl-2  w-full`}>
        {exploreData.contains &&
          exploreData.contains
            .map((f, i) => {
              return (
                <Folders
                  key={f.id}
                  renameFileDir={renameFileDir}
                  fileSelectedId={fileSelectedId}
                  setValue={setValue}
                  editedName={editedName}
                  setEditedName={setEditedName}
                  EditHandle={EditHandle}
                  setEditId={setEditId}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  editId={editId}
                  exploreData={f}
                  index={i}
                  addNewFolder={addNewFolder}
                  addNewFile={addNewFile}
                  deleteFileDir={deleteFileDir}
                />
              );
            })
            .sort((a, b) => {
              return b.props.exploreData.isFolder - a.props.exploreData.isFolder;
            })}
      </div>
    </div>
  );
}
