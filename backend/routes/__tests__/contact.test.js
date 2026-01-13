const request = require('supertest')
const express = require('express')
const contactRoute = require('../contact')

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' })
  })
}))

const app = express()
app.use(express.json())
app.use('/api', contactRoute)

describe('POST /api/contact', () => {
  test('devrait retourner 400 si objet manquant', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        email: 'test@test.com',
        message: 'Test message'
      })

    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toContain('requis')
  })

  test('devrait retourner 400 si email manquant', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        objet: 'Question',
        message: 'Test message'
      })

    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
  })

  test('devrait envoyer l\'email avec succès', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        objet: 'Question',
        email: 'test@test.com',
        message: 'Test message'
      })

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.message).toContain('succès')
  })

  test('devrait accepter un message vide (facultatif)', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        objet: 'Partenariat',
        email: 'test@test.com'
      })

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
  })
})