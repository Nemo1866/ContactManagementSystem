const passport = require("passport")
const { addContact, viewContact, viewContactById, updateContact, deleteAll, deleteById, exportAllContacts, restoreContact, restoreContactById, restoreContacts } = require("../controller/contactController")
const { register, login, resetPassword, resetPasswordByToken } = require("../controller/userController")
const { isUserAuthenticated } = require("../passportConfig")

const router=require("express").Router()

router.post("/add",isUserAuthenticated,addContact)
/**
 * @swagger
 * /add:
 *   post:
 *     tags:
 *       - Contacts
 *     summary: Add new contact.
 *     description: add new contact with their firstName, lastName ,email ,phone & address .
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the person.
 *               lastName:
 *                 type: string
 *                 description: the last name of the person.
 *               email:
 *                 type: string
 *                 description: The email of the person.
 *               phone:
 *                 type: string
 *                 description: The phone of the person.
 *               address:
 *                 type: string
 *                 description: The address of the person.
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - address
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Add Contact.
 *             example:
 *               message: "Registered Sucessfully"
 */

router.get("/contacts",isUserAuthenticated,viewContact)
/**
 * @swagger
 * /contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get All Contacts By a user.
 *     description: Returns a list of all contacts that listed by the user if the user is logged in else it will should "you need to log in".
 *     responses:
 *       '200':
 *         description: A successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: list of contacts.
 *             example:
 *               message: {"id":1,"firstName":hello,"lastName":World,"email":test@gmail.com,"phone":8375834783,"address":XYZ}
 */

router.get("/contacts/:id",isUserAuthenticated,viewContactById)
/**
 * @swagger
 * /contacts/{id}:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Get a single contact by their id.
 *     description: it will display a single contact based on the id by the user if the user is logged in.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id for the contact.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: contact.
 *             example:
 *               message: {"id":1,"firstName":hello,"lastName":World,"email":test@gmail.com,"phone":8375834783,"address":XYZ}
 */
router.put("/contacts/:id",isUserAuthenticated,updateContact)
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     tags:
 *       - Contacts
 *     summary: Modify a contacts.
 *     description: it will take a contact_id in params check whether the contact exist, if exist then update all the fields, if the user is logged in.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of contact.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the person.
 *               lastName:
 *                 type: string
 *                 description: the last name of the person.
 *               email:
 *                 type: string
 *                 description: The email of the person.
 *               phone:
 *                 type: string
 *                 description: The phone of the person.
 *               address:
 *                 type: string
 *                 description: The address of the person.
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - address
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: update recruiter.
 *             example:
 *               message: Sucessfully Updated a recruter.
 */
router.delete("/contacts",isUserAuthenticated,deleteAll)
/**
 * @swagger
 * /contacts:
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Remove all contact.
 *     description: User can remove all contact with their contact_id if user is logged in. 

 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: remove a contact.
 *             example:
 *               message: "Removed a contact"
 */

router.delete("/contacts/:id",isUserAuthenticated,deleteById)
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     tags:
 *       - Contacts
 *     summary: Remove a contact.
 *     description: User can remove a contact with their contact_id if user is logged in. 
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id for the contact.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: remove a contact.
 *             example:
 *               message: "Removed a contact"
 */
router.get("/restore/:id",isUserAuthenticated,restoreContactById)
/**
 * @swagger
 * /restore/{id}:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: restore a contact.
 *     description: User can restore a contact with their contact_id if user is logged in. 
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id for the contact.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: restore a contact.
 *             example:
 *               message: "restore a contact"
 */

router.get("/restore",isUserAuthenticated,restoreContacts)
/**
 * @swagger
 * /contacts:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Restore all contact.
 *     description: User can restore all contact with their contact_id if user is logged in. 

 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: restore all contact.
 *             example:
 *               message: "Restored all contacts"
 */

router.get("/export",isUserAuthenticated,exportAllContacts)
/**
 * @swagger
 * /export:
 *   get:
 *     tags:
 *       - Contacts
 *     summary: Export all the contacts.
 *     description: Export all the contacts in an excel file.
 *     responses:
 *       '200':
 *         description: A successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: export data.
 *             example:
 *               message: exported all the data.
 */




//User Routes
router.post("/register",register)
/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Resgiter User.
 *     description: Register the user with their firstName lastName email & password .
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *               lastName:
 *                 type: string
 *                 description : the last name of the user.
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Register user.
 *             example:
 *               message: "Registered Sucessfully"
 */
router.post("/login",passport.authenticate("local"),login)
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login route for User.
 *     description: Login Api for authenticating all users.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: login for the user.
 *             example:
 *               message: Welcome Test
 */

router.post("/resetpassword",resetPassword)
/**
 * @swagger
 * /resetpassword:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Password Resetter for User.
 *     description: It Will Take the req.body as email and verify if that email exists , if exist then send an email to the user with a token .
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *             required:
 *               - email
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: reset password for the Candidate.
 *             example:
 *               message: Token Sent to your email.
 */

router.post("/resetpassword/:token",resetPasswordByToken)

/**
 * @swagger
 * /resetpassword/{token}:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Password Update for user.
 *     description: it will first verify the token from the params and if the token is same as sent to user email then it will update the user password.
 *     parameters:
 *       - name: token
 *         in: path
 *         description: The token for resetting password.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 description : The password of the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: reset password for the User via token.
 *             example:
 *               message: Sucessfully Updated the password.
 */






module.exports=router