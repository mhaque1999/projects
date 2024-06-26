const express = require("express")
const router = new express.Router();
const Message = require("../models/message");
const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth");
/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
      const id = req.params.id;
      const message = await Message.get(id)
      return res.json({message: message});
    }
  
    catch (error) {
      return next(error);
    }
  });

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
      const username = req.user.username;
      const toUsername = req.body.to_username;
      const body = req.body.body;
      const message = await Message.create({from_username:username, to_username:toUsername, body:body})
      return res.json({message: message});
    }
  
    catch (error) {
      return next(error);
    }
  });

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post("/:id/read", ensureLoggedIn, async function (req, res, next) {
    try {
        const username = req.user.username;
        const id = req.params.id;
        const readMessage = await Message.markRead(id);
    
        return res.json({readMessage});
    }
  
    catch (error) {
      return next(error);
    }
  });

  module.exports = router;