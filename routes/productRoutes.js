
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 1. GET all products
router.get("/", async (req, res) => {
    try {
        const [products] = await db.promise().execute(
            "SELECT * FROM products"
        );

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products"
        });
    }
});

// 2. GET product by ID
router.get("/:id", async (req, res) => {
    try {
        const [products] = await db.promise().execute(
            "SELECT * FROM products WHERE id = ?",
            [req.params.id]
        );

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            product: products[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch product"
        });
    }
});

// 3. CREATE product
router.post("/", async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stock,
            image_url
        } = req.body;

        if (!name || !Number.isFinite(price) || price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid name and positive price are required"
            });
        }

        if (
            stock !== undefined &&
            (!Number.isInteger(stock) || stock < 0)
        ) {
            return res.status(400).json({
                success: false,
                message: "Stock must be a non-negative integer"
            });
        }

        const [result] = await db.promise().execute(
            `INSERT INTO products
            (name, description, price, category, stock, image_url)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                name,
                description || null,
                price,
                category || null,
                stock ?? 0,
                image_url || null
            ]
        );

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            productId: result.insertId
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create product"
        });
    }
});

// 4. UPDATE product
router.put("/:id", async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            stock,
            image_url
        } = req.body;

        if (!name || !Number.isFinite(price) || price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid name and positive price are required"
            });
        }

        if (
            stock !== undefined &&
            (!Number.isInteger(stock) || stock < 0)
        ) {
            return res.status(400).json({
                success: false,
                message: "Stock must be a non-negative integer"
            });
        }

        const [result] = await db.promise().execute(
            `UPDATE products
            SET name = ?, description = ?, price = ?,
                category = ?, stock = ?, image_url = ?
            WHERE id = ?`,
            [
                name,
                description || null,
                price,
                category || null,
                stock ?? 0,
                image_url || null,
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update product"
        });
    }
});

// 5. DELETE product
router.delete("/:id", async (req, res) => {
    try {
        const [result] = await db.promise().execute(
            "DELETE FROM products WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete product"
        });
    }
});

module.exports = router;

