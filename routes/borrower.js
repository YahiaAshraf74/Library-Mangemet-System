const express = require('express');
const {
  registerBorrower,
  updateBorrower,
  deleteBorrower,
  listBorrowers
} = require('../controllers/borrowerController');

const router = express.Router();

router.post('/borrowers', registerBorrower);
router.put('/borrowers/:id', updateBorrower);
router.delete('/borrowers/:id', deleteBorrower);
router.get('/borrowers', listBorrowers);

module.exports = router;
