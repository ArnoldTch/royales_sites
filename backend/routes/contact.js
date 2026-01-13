const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

router.post('/contact', async (req, res) => {
  const { objet, email, message } = req.body;

  if (!objet || !email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Objet et email sont requis' 
    });
  }

  const mailToYou = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `Nouveau message - ${objet}`,
    html: `
      <h2>Nouveau message du formulaire de contact</h2>
      <p><strong>Objet :</strong> ${objet}</p>
      <p><strong>Email du demandeur :</strong> ${email}</p>
      <p><strong>Message :</strong></p>
      <p>${message || 'Aucun message fourni'}</p>
    `
  };

  const mailToSender = {
    from: process.env.EMAIL_USER,
    to: email, 
    subject: 'Confirmation de réception - Royales Festival',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333; text-align: center;">Merci !</h2>
        <p style="font-size: 16px; color: #555;">
          Nous avons bien reçu votre demande concernant : <strong>${objet}</strong>
        </p>
        <p style="font-size: 16px; color: #555;">
          On vous contacte très bientôt !
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 14px; color: #888; text-align: center;">
          Royales Festival<br>
          Campo Santo - Orléans
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToSender);
    
    res.status(200).json({ 
      success: true, 
      message: 'Emails envoyés avec succès' 
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi des emails' 
    });
  }
});

module.exports = router;