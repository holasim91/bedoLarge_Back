import { Request, Response } from "express";
const { pool } = require("../model");

const testData = [];

const addSubs = async (req: Request, res: Response) => {
    const param = req.params
    const _query = 'INSERT INTO bedoLarge.subs VALUES (?,?,?)'
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(_query);
        res.send(rows)
    } catch (error) {
        console.error(error)
    } finally {
        connection.release();
    }

};





export default addSubs;