const listingRoutes = require("./routes/listingRoutes");
app.use("/api/listings", listingRoutes);

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Wrap Express with HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from all origins during development
  },
});

// WebSocket Events
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for incoming messages
  socket.on("sendMessage", (message) => {
    console.log("Message received:", message);
    io.emit("receiveMessage", message); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const messageRoutes = require("./routes/messageRoutes");
app.use("/api/messages", messageRoutes);

const brokerRoutes = require("./routes/brokerRoutes");
app.use("/api/brokers", brokerRoutes);


const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

const analyticsRoutes = require("./routes/analyticsRoutes");
app.use("/api/analytics", analyticsRoutes);
