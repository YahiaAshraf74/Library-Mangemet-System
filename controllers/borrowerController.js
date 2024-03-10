const Borrower = require('../models/borrower');

const registerBorrower = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newBorrower = await Borrower.create({ name, email });
    return res.status(201).json(newBorrower);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBorrower = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found." });
    }

    await borrower.update({ name, email });
    return res.status(200).json(borrower);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBorrower = async (req, res) => {
  try {
    const { id } = req.params;
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
      return res.status(404).json({ message: "Borrower not found." });
    }

    await borrower.destroy();
    return res.status(200).json({ message: "Borrower deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const listBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.findAll();
    return res.status(200).json(borrowers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerBorrower,
  updateBorrower,
  deleteBorrower,
  listBorrowers
};
