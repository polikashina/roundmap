import { v4 as uuidv4 } from 'uuid';
import { Express, Request, Response , NextFunction} from 'express'

export const setRequestId = (req:Request, res: Response, next: NextFunction) => {
    const uuid = uuidv4();
    res.header('Request-id', uuid)
    next()
}
