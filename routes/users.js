const { User, validate } = require("../models/user");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.get("/me", auth, async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");

	res.send(user);
});


router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("user already registered");

	user = new User(_.pick(req.body, ["name", "email", "password"]));

	// for validating
	const salt = await bcrypt.genSalt();
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token = user.generateAuthToken();

	res
		.header("x-auth-token", token)
		.send(_.pick(user, ["_id", "name", "email"]));
});

router.get("/", auth, async (req, res) => {
	const users = await User.find().select("-password");

	res.send(users);
});


router.delete('/:id', [auth, admin], async (req, res) => {
	
});
module.exports = router;
