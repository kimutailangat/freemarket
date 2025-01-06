const express = require("express");
const {
  createListing,
  getAllListings,
  getListingsBySeller,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");

const router = express.Router();

// Create a listing
router.post("/", createListing);

// Get all listings
router.get("/", getAllListings);

// Get listings by seller
router.get("/seller/:sellerId", getListingsBySeller);

// Update a listing
router.put("/:id", updateListing);

// Delete a listing
router.delete("/:id", deleteListing);

module.exports = router;
