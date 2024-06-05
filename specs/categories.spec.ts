import * as supertest from 'supertest'
const request = supertest('https://api.trademe.co.nz/v1/Categories')

describe('GET REQUESTS', () =>{
    it('GET /posts', async () => {
        const response = await request.get('.xml')
        // 200 OK
        expect(response.status).toBe(200)
    })
})