const { dataModel } = require("../Models/DataModel");

const storeData = async (req, res) => {
  const { key, value, userId } = req.body;
  console.log(key, value, userId);

  try {
    const exists_key = await dataModel.findOne({ key: key, userId: userId });

    if (exists_key) {
      return res.send({
        status: "error",
        code: "KEY_EXISTS",
        message:
          "The provided key already exists in the database. To update an existing key, use the update API.",
      });
    }
    if (!key) {
      return res.send({
        status: "error",
        code: "INVALID_KEY",
        message: "The provided key is not valid or missing.",
      });
    }

    if (!value) {
      return res.send({
        status: "error",
        code: "INVALID_VALUE",
        message: "The provided value is not valid or missing.",
      });
    }

    const newData = new dataModel({
      userId: userId,
      key: key,
      value: value,
    });

    await newData.save();
    res.send({
      status: "success",
      message: "Data stored successfully.",
    });
  } catch (err) {
    res.send({
      status: "error",
      message: "Internal Server Error ",
    });
  }
};

const retrieveData = async (req, res) => {
  const { userId } = req.body;
  const key = req.params.key;

  const exists_key = await dataModel.findOne({ key: key, userId: userId });

  if (!exists_key) {
    return res.send({
      status: "error",
      code: "KEY_NOT_FOUND",
      message: "The provided key does not exist in the database.",
    });
  }

  res.send({
    status: "success",
    data: {
      key: exists_key.key,
      value: exists_key.value,
    },
  });
};

const updateData = async (req, res) => {
  const { value, userId } = req.body;
  const key = req.params.key;

  const exists_key = await dataModel.findOneAndUpdate(
    {
      key: key,
      userId: userId,
    },
    { value: value }
  );

  if (!exists_key) {
    return res.send({
      status: "error",
      code: "KEY_NOT_FOUND",
      message: "The provided key does not exist in the database.",
    });
  }

  res.send({
    status: "success",
    message: "Data updated successfully.",
  });
};

const deleteData = async (req, res) => {
  const { userId } = req.body;
  const key = req.params.key;

  const exists_key = await dataModel.findOneAndDelete({
    key: key,
    userId: userId,
  });

  if (!exists_key) {
    return res.send({
      status: "error",
      code: "KEY_NOT_FOUND",
      message: "The provided key does not exist in the database.",
    });
  }

  res.send({
    status: "success",
    message: "Data deleted successfully.",
  });
};

module.exports = {
  storeData,
  retrieveData,
  updateData,
  deleteData,
};
