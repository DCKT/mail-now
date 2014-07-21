mail-now
========

Launch a mail server for any application


## SETUP

You just need to run : `npm install -g mail-now`

This module use Node-mailer for sending mail, actualy the configuration is very basic (spam inc).

When the package is setup, you can run from anywhere the **mail-now** alias. It will run a Node.js instance and will ask you some informations.

The Node-mailer authentication servicies use Gmail actualy (ASAP you will be able to choose)
- email
- password **(not hidden yet)**
- email to delivery


This module create a little web server listening on **http://localhost:1337** and waiting for __POST__ request on `/`.
The parameters must be sent as JSON, here is an example :
```
{
  mail: {
  	sender: "contact@contact.com",
  	name: "Contacto",
  	message: "Hello contacta"
  }
}
```