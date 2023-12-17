import { Request, Response } from "express";
const { pool } = require("../model");

export const addSubs = async (req: Request, res: Response) => {
    const param = req.body
    const values = param.map((p: { id: string; subs_num: number; created_at: string; title: string; }) => [p.id, Number(p.subs_num), p.created_at, p.title.trim()])
    const placeholder = values.map((a: any[]) => `('${a[0]}', '${a[1]}', '${a[2]}', '${a[3]}')`).join(', ')

    console.log(values)
    const _query = `INSERT INTO bedoLarge.subs (id, subs_num, created_at, title ) VALUES ${placeholder};`
    console.log(_query)
    const connection = await pool.getConnection();
    try {
        await connection.query(_query);
        res.status(200).json({
            status: 200,
            message: 'Insert Complete'
        });
        connection.commit();
    } catch (error) {
        console.error(error)
    } finally {
        connection.release();
    }

};


export const getSub = async (req: Request, res: Response) => {
    const _query = 'SELECT * FROM bedoLarge.subs '
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(_query);
        const removeTestData = rows.filter((r: { id: string; }) => r.id !== 'testtest')
        res.send(removeTestData)
    } catch (error) {
        console.error(error)
    } finally {
        connection.release();
    }

};


// export default addSubs;