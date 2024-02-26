var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "maxence.ogier@gmail.com",
    subject: "Nouveau message depuis le formulaire de contact",
    text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail" });
    } else {
      console.log("Email envoyé: " + info.response);
      res.status(200).json({ success: "Email envoyé avec succès" });
    }
  });
});

module.exports = router;
