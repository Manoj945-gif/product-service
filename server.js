const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        service: "Product Service",
        status: "healthy"
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Product Service running on port ${PORT}`);
});
