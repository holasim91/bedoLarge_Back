import { Request, Response } from "express";
const { pool } = require("../model");



const selectUser = async (req: Request, res: Response) => {
    const _query = 'SELECT * FROM bedoLarge.users '
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(_query);
        const removeTestData = rows.filter((r: { id: string; }) => r.id !=='testtest')
        res.send(removeTestData)
    } catch (error) {
        console.error(error)
    } finally {
        connection.release();
    }

};






export default selectUser;