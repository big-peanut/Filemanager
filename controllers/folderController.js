const Folders = require("../models/folderModel");

// Create a new folder
exports.createFolder = async (req, res, next) => {
  const { folderName } = req.body;
  try {
    // Create a new folder with provided name, no parent ID, and user ID
    const newFolder = await Folders.create({
      name: folderName,
      parentId: null,
      userId: req.user.id,
    });
    res.json({ message: "Folder created", folder: newFolder });
  } catch (err) {
    console.log(err);
  }
};

// Get all top-level folders for a user
exports.getFolder = async (req, res, next) => {
  try {
    // Find all folders with no parent ID (top-level folders) for the logged-in user
    const folders = await Folders.findAll({
      where: { parentId: null, userId: req.user.id },
    });
    res.json({ folders: folders });
  } catch (err) {
    console.log(err);
  }
};

// Get subfolders for a specific parent folder
exports.getSubFolder = async (req, res, next) => {
  try {
    const parentId = req.params.parentId;
    // Find all folders that have a specific parent ID, belonging to the logged-in user
    const subFolders = await Folders.findAll({
      where: { parentId: parentId, userId: req.user.id },
    });
    res.json({ subFolders: subFolders });
  } catch (err) {
    console.log(err);
  }
};

// Create a subfolder within a parent folder
exports.createSubfolder = async (req, res, next) => {
  try {
    const { folderName, parentId } = req.body;
    // Create a new subfolder with provided name, parent ID, and user ID
    const newSubFolder = await Folders.create({
      name: folderName,
      parentId: parentId,
      userId: req.user.id,
    });
    res.json({ message: "Subfolder created", subFolder: newSubFolder });
  } catch (err) {
    console.log(err);
  }
};

// Delete a folder by its ID
exports.deleteFolder = async (req, res, next) => {
  try {
    // Delete the folder based on the provided folder ID
    await Folders.destroy({ where: { id: req.params.folderId } });
  } catch (err) {
    console.log(err);
  }
};
