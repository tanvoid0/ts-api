/**
 * Require modules
 */

import express from "express";

/**
 * Router definition
 */
export const router = express.Router();

// GET reviews
router.get('/', (req, res) => {
    return "Hello";
    // res.render('index', {name: 'john'});
});


