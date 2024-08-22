import { Request, Response, NextFunction } from 'express';
import { setAllAbilities } from '../Models/abilitiesModels';

export async function getAllAbilities(req: Request, res: Response, next: NextFunction) {

    setAllAbilities()

    try{
        const rows = await setAllAbilities();

        if(rows.length === 0){
            return res.status(404).json({msg: "No data found"});
        }
        console.log(rows, "Rows")
        console.log(rows.abilities, "<<< 1")
        
        const abilities = rows
        console.log(abilities, "<<< 2")

        res.status(200).json(abilities)
    } catch(error){
        next(error);
    }
}

