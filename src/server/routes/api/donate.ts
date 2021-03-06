import * as express from 'express';
import { charge } from '../../utils/stripe/donations';

const donateRouter = express.Router();

donateRouter.post('/', async (req, res, next) => {
    try {
        await charge(req.body.token.id, req.body.amount);
        res.json({ message: "Charged!"});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default donateRouter;