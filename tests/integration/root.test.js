const request = require('supertest');
const app = require('../../src/app')

describe('ROOT', () => {
  it('should return a json whit 4 currency propertys, dolar, peso, euro and bitcoin', async () => {
    const res = await request(app).get('/')

    expect(res.body).toHaveProperty('dolar', 'peso', 'euro', 'bitcoin')
    expect(res.body.dolar).toContain('R$', '.')
    expect(res.body.peso).toContain('R$', '.')
    expect(res.body.euro).toContain('R$', '.')
    expect(res.body.bitcoin).toContain('$', '.')
  })
});
