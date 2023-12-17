import { Request, Response } from "express";
const { pool } = require("../model");

export const addSubs = async (req: Request, res: Response) => {

    type Item = {
        id: string,
        subs_num: number,
        created_at: string,
        title: string
    }

    const param = req.body
    const values = param.map((p: Item) => [p.id, Number(p.subs_num), p.created_at, p.title.trim()])
    const placeholder = values.map((a: any[]) => `('${a[0]}', '${a[1]}', '${a[2]}', '${a[3]}')`).join(', ')
    const _query = `INSERT INTO bedoLarge.subs (id, subs_num, created_at, title ) VALUES ${placeholder};`
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


export const getSubs = async (req: Request, res: Response) => {
    const _query = 'SELECT * FROM bedoLarge.subs '
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query(_query);
        const removeTestData = rows.filter((r: { id: string; }) => r.id !== 'testtest')
        res.send({
            status:200,
            data: removeTestData
        })
    } catch (error) {
        console.error(error)
    } finally {
        connection.release();
    }

};

export const getSub = async (req: Request, res: Response) => {
    const id = req.params.id
    const _query = `SELECT * FROM bedoLarge.subs WHERE id ='${id}';`
    const connection = await pool.getConnection();
    try {
        const [data] = await connection.query(_query);
        const result = data[0]
        res.send({
            status:200,
            data: result
        })
    } catch (error) {
        console.error(error)
    } finally {
        connection.release();
    }

};
