
const { User, validate } = require('../models/user');
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) => {
    
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.find(filter, projection, options);
    if (user) return res.status(400).send('user already registered');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    await user.save();

    res.send(user);
});

router.put('/:id', async (req, res) => {
    
    const user = await User.findById(req.params.id);

    if (!user) return;
})