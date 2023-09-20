
const express = require("express");
const ExpressError = require("../expressError")
let router = new express.Router();
const db = require("../db");

/** GET / => listing all the companies */
router.get('', async (req, res, next) => {
    try {
        const result = await db.query(
            `SELECT code, name 
            FROM companies`
        );
        return res.json({ "companies": result.rows })
    }
    catch (error) {
        return next(error);
    }
});

/**GET /:code => detail on company */
router.get('/:code', async (req, res, next) => {
    try {
        let code = req.params.code;

        const compResult = await db.query(
            `SELECT code, name, description
           FROM companies
           WHERE code = $1`,
            [code]
        );

        const invResult = await db.query(
            `SELECT id
           FROM invoices
           WHERE comp_code = $1`,
            [code]
        );

        if (compResult.rows.length === 0) {
            throw new ExpressError(`No such company: ${code}`, 404)
        }

        const company = compResult.rows[0];
        const invoices = invResult.rows;

        company.invoices = invoices.map(inv => inv.id);

        return res.json({ "company": company });
    }
    catch (error) {
        return next(error);
    }
});

/**POST / => add a new company */
router.post('', async (req, res, next) => {
    try {
        let { name, description } = req.body;

        const result = await db.query(
            `INSERT INTO companies (code,name,description)
            VALUES ($1,$2,$3)
            RETURNING code,name,description`,
            [code, name, description]
        );

        return res.status(201).json({ "company": result.rows[0] });
    }
    catch (error) {
        return next(error);
    }
});

/**PUT :code => update an exsiting company  */
router.put('/:code', async (req, res, next) => {
    try {
        let { name, description } = req.body;
        let code = req.params.code;

        const result = await db.query(
            `UPDATE companies
           SET name=$1, description=$2
           WHERE code = $3
           RETURNING code, name, description`,
            [name, description, code]);

        if (result.rows.length === 0) {
            throw new ExpressError(`No such company: ${code}`, 404)
        } else {
            return res.json({ "company": result.rows[0] });
        }
    }
    catch (error) {
        return next(error);
    }
});

/**DELETE :code => delete a company */
router.delete('/:code', async (req, res, next) => {
    try {
        let code = req.params.code;

        const result = await db.query(
            `DELETE company
            WHERE code=$1
            RETURNING code`,
            [code]
        );
        if (result.rows.length === 0) {
            throw new ExpressError(`Company does not exsist: ${code}`, 404);
        }
        else {
            return res.json({ "status": "deleted" });
        }
    }
    catch (error) {
        return next(error);

    }
});

module.exports = router;