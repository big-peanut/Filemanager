const Files = require("../models/fileModel");

// Add file details to the database
exports.addFilesToDB = async (req, res, next) => {
  try {
    const { name, folderId, Location } = req.body;
    // Create a new file entry with provided name, folder ID, user ID, and file location
    const newFile = await Files.create({
      name: name,
      userId: req.user.id,
      folderId: folderId,
      Location: Location,
    });
    res.json({ newFile: newFile });
  } catch (err) {
    console.log(err);
  }
};

// Get files based on folder ID
exports.getFiles = async (req, res, next) => {
  try {
    let folderId = req.params.folderId;
    // Convert 'null' string to actual null value for querying
    folderId = folderId === "null" ? null : folderId;
    // Find all files belonging to a specific folder or belonging to the user if folderId is null
    const response = await Files.findAll({
      where: { folderId: folderId || null, userId: req.user.id },
    });

    res.json({ data: response });
  } catch (err) {
    console.log(err);
  }
};

// Delete files by their name
exports.deleteFiles = async (req, res, next) => {
  try {
    // Delete the file based on the provided file name
    await Files.destroy({ where: { name: req.params.fileName } });
  } catch (err) {
    console.log(err);
  }
};
