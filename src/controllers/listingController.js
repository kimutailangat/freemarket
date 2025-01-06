const prisma = require("../prisma");

// Create a new listing
const createListing = async (req, res) => {
  const { title, description, price, sellerId } = req.body;
  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price,
        sellerId,
      },
    });
    res.status(201).json({ message: "Listing created successfully", listing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating listing." });
  }
};

// Get all listings
const getAllListings = async (req, res) => {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        seller: {
          select: { name: true, email: true },
        },
      },
    });
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching listings." });
  }
};

// Get listings by seller
const getListingsBySeller = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const listings = await prisma.listing.findMany({
      where: { sellerId: parseInt(sellerId, 10) },
    });
    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching seller's listings." });
  }
};

// Update a listing
const updateListing = async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  try {
    const updatedListing = await prisma.listing.update({
      where: { id: parseInt(id, 10) },
      data: { title, description, price },
    });
    res.status(200).json({ message: "Listing updated successfully", updatedListing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating listing." });
  }
};

// Delete a listing
const deleteListing = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.listing.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(200).json({ message: "Listing deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting listing." });
  }
};

module.exports = {
  createListing,
  getAllListings,
  getListingsBySeller,
  updateListing,
  deleteListing,
};

