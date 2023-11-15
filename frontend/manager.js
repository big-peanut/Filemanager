let parentId = null;

function createFolderElement(folderName, folderId) {
  const folderContainer = document.createElement("div");
  folderContainer.classList.add("folder");

  const folderIcon = document.createElement("i");
  folderIcon.classList.add("fa", "fa-folder");

  const folderNameElement = document.createElement("div");
  folderNameElement.textContent = folderName;

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa", "fa-trash");
  deleteIcon.addEventListener("click", () => {
    deleteFolder(folderId);
  });

  folderContainer.appendChild(folderIcon);
  folderContainer.appendChild(folderNameElement);
  folderContainer.appendChild(deleteIcon);

  folderContainer.addEventListener("click", () => {
    const foldersContainer = document.querySelector(".folders-container");
    foldersContainer.innerHTML = "";
    parentId = folderId;
    getSubFolders(parentId);
    getFiles(parentId);
  });

  return folderContainer;
}

async function deleteFolder(folderId) {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:3000/deleteFolder/${folderId}`, {
      headers: { Authorization: token },
    });
    const foldersContainer = document.querySelector(".folders-container");
    foldersContainer.innerHTML = "";
    getFolders();
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
}

async function deleteFolderAndSubfolders(folderId) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:3000/getSubFolders/${folderId}`,
      { headers: { Authorization: token } }
    );

    const subFolders = response.data.subFolders;
    for (const subFolder of subFolders) {
      await deleteFolderAndSubfolders(subFolder.id);
    }

    await deleteFolder(folderId);
  } catch (error) {
    console.error("Error deleting folder and subfolders:", error);
  }
}

function createFileElement(fileName, url) {
  const fileContainer = document.createElement("div");
  fileContainer.classList.add("file");

  const fileIcon = document.createElement("i");
  fileIcon.classList.add("fa", "fa-file");

  const fileNameElement = document.createElement("div");
  fileNameElement.textContent = fileName;

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa", "fa-trash");
  deleteIcon.addEventListener("click", () => {
    deleteFile(fileName);
  });

  const fileLink = document.createElement("a");
  fileLink.href = url;
  fileLink.target = "_blank";
  fileLink.appendChild(fileIcon);
  fileLink.appendChild(fileNameElement);

  fileContainer.appendChild(fileLink);
  fileContainer.appendChild(deleteIcon);

  fileLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.open(url, "_blank");
  });

  return fileContainer;
}

async function deleteFile(fileName) {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:3000/deleteFile/${fileName}`, {
      headers: { Authorization: token },
    });
    const fileContainer = document.querySelector(".file-container");
    fileContainer.innerHTML = "";
    getFiles(parentId);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

async function getFiles(folderId) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:3000/getFiles/${folderId}`,
      { headers: { Authorization: token } }
    );

    const files = response.data.data;
    const fileContainer = document.querySelector(".file-conatiner");
    fileContainer.innerHTML = "";

    files.forEach((file) => {
      const fileElement = createFileElement(file.name, file.Location);
      fileContainer.appendChild(fileElement);
    });
  } catch (err) {
    console.log(err);
  }
}

async function getSubFolders(parentId) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:3000/getSubFolders/${parentId}`,
      { headers: { Authorization: token } }
    );
    console.log(response);
    const folders = response.data.subFolders;
    const foldersContainer = document.querySelector(".folders-container");

    folders.forEach((folder) => {
      const folderElement = createFolderElement(folder.name, folder.id);
      foldersContainer.appendChild(folderElement);
    });
  } catch (err) {
    console.log(err);
  }
}

async function addFolder(folderName) {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:3000/createFolder",
      { folderName: folderName },
      { headers: { Authorization: token } }
    );

    const foldersContainer = document.querySelector(".folders-container");
    foldersContainer.innerHTML = "";
    getFolders();
  } catch (error) {
    console.error("Error creating folder:", error);
  }
}

async function getFolders() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/getFolders", {
      headers: { Authorization: token },
    });

    const folders = response.data.folders;
    const foldersContainer = document.querySelector(".folders-container");

    folders.forEach((folder) => {
      const folderElement = createFolderElement(folder.name, folder.id);
      foldersContainer.appendChild(folderElement);
    });
  } catch (error) {
    console.error("Error fetching folders:", error);
  }
}

async function addSubfolder(folderName, parentId) {
  try {
    const token = localStorage.getItem("token");
    const data = {
      folderName: folderName,
      parentId: parentId,
    };
    await axios.post("http://localhost:3000/createSubfolder", data, {
      headers: { Authorization: token },
    });
    getSubFolders(parentId);
  } catch (err) {
    console.log(err);
  }
}

const createFolderBtn = document.querySelector(".btn-create-folder");

createFolderBtn.addEventListener("click", async () => {
  const folderName = prompt("Enter folder name:");
  if (folderName && folderName.trim().length !== 0) {
    if (parentId) {
      addSubfolder(folderName, parentId);
    } else {
      addFolder(folderName);
    }
  } else {
    alert("Folder name cannot be empty");
  }
});

async function addFile(file) {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);
    const response = await axios.post(
      "http://localhost:3000/addFile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );

    addFileToDB(response.data.key, parentId, response.data.Location);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

async function addFileToDB(name, folderId, Location) {
  try {
    const token = localStorage.getItem("token");
    const data = {
      name: name,
      folderId: folderId,
      Location: Location,
    };
    await axios.post("http://localhost:3000/addFilesToDB", data, {
      headers: { Authorization: token },
    });
  } catch (err) {
    console.log(err);
  }
}

const fileInput = document.querySelector("#file");

fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  await addFile(file);
});

const logoutBtn = document.querySelector(".btn-logout");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", () => {
  getFolders();
  getFiles(parentId);
});
