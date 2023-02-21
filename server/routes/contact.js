import express from "express";

import { addContact, deleteContact } from "../controllers/contact.js";

const contactRouter = express.Router();
contactRouter.post("/add-contact", addContact);
contactRouter.delete("/delete-contact", deleteContact);

export default contactRouter;
