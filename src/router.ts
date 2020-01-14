import * as express from 'express'
import User from './models/User'
import cors from 'cors'

class Router {

    constructor(server: express.Express) {
        const router = express.Router()

        router.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: "Go to /swagger/*"
            })
        })

        //get all users
        router.get('/users', cors(), (req: express.Request, res: express.Response) => {
            User.find(function (err, users) {
                if (err) {
                    res.json({
                        status: "error",
                        message: err,
                    });
                }
                res.json({
                    status: "success",
                    message: "Users retrieved successfully",
                    data: users
                });
            });
        })

        //create new users
        router.post('/users', cors(), (req: express.Request, res: express.Response) => {
            try {
                User.find().sort({ "id": -1 }).limit(1).exec((err, data) =>{
                        let user = new User();
                        user.name = req.body.name ? req.body.name : 'anonymous';
                        user.email = req.body.email;
                        user.created_date = String(new Date());
                        user.birthdate = req.body.birthdate;
                        user.id = typeof data[0] === 'undefined'? 0 : data[0].id + 1;
                      
                        user.save(function (err) {
                            if (err)
                                res.json(err);
                            else
                                res.json({
                                    message: 'New user created!',
                                    data: user
                                });
                            });
                });
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "problem with posted data" }));
            }
        })

        //get user by id
        router.get('/users/:id', cors(), (req: express.Request, res: express.Response) => {
            try {
                User.find({id:req.params.id},(err, data) =>{
                    if (Object.keys(data).length === 0){
                        res.json({
                            message: 'User Not Found!',
                            
                        });
                    }
                    else{
                        res.json({
                            message: 'User Found!',
                            data: data
                        });
                    }

                });
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "no such user" }));
            }
        })

        //update user
        router.put('/users/:id', cors(), (req: express.Request, res: express.Response) => {
            try {
                User.find({id:req.params.id},(err, data) =>{
                    if (Object.keys(data).length === 0){
                        res.json({
                            message: 'User Not Found!',
                            
                        });
                    }
                    else{
                        data[0].name = req.body.name ? req.body.name : data[0].name;
                        data[0].email = req.body.email ? req.body.email : data[0].email;
                        data[0].birthdate = req.body.birthdate ? req.body.birthdate : data[0].birthdate;
                        data[0].lastModified_date = String(new Date());
                        data[0].save(function (err) {
                            if (err)
                                res.json(err);
                            else
                                res.json({
                                    message: 'User updated!',
                                    data: data
                                });
                            });
                    }

                });
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "request failed" }));
            }
        })

        //delete user
        router.delete('/users/:id', cors(), (req: express.Request, res: express.Response) => {
            try {
                User.find({id:req.params.id},(err, data) =>{
                    if (Object.keys(data).length === 0){
                        res.json({
                            message: 'User Not Found!',
                            
                        });
                    }
                    else{
                        User.deleteOne({id:req.params.id},(err) =>{
                            if (!err){
                                res.json({
                                    message: 'Deleted successfully!',
                                    data: data
                            });
                        }
                        });
                    }

                });
            } catch (e) {
                res.status(400).send(JSON.stringify({ "error": "request failed" }));
            }
        });

        router.options('*', cors());

        server.use('/', router)
    }
}

export default Router;