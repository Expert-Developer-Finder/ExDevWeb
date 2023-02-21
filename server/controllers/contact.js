import Contact from "../models/contact.js";
import { getUser } from "./user.js";

export const addContact = async (req, res) => {
  const { userId, expertId, repoId } = req.body;
  const newContact = new Contact({
    userId: userId,
    expertId: expertId,
    repoId: repoId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newContact.save();

    res.status(201).json(newContact);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deleteContact = async (req, res) => {
  const { userId, expertId, repoId } = req.body;

  try {
    const contact = await Contact.find({
      userId: userId,
      expertId: expertId,
      repoId: repoId,
    });

    await Contact.findByIdAndDelete(contact[0]._id);
    console.log(contact[0]._id);

    res.status(200).json("Contact deleted successfully");
  } catch (e) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const returnContacts = async (req, res) => {
  console.log(req.body);

  const { userId, repoId } = req.body;
  const contacts = await Contact.find({
    userId: userId,
    repoId: repoId,
  });

  var contactList = [];
  for (let i = 0; i < contacts.length; i++) {
    const contact = await getUser({
      body: { id: contacts[i].expertId },
    });
    contactList.push(contact);
  }

  return contactList;
};
