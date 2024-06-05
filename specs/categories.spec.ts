import * as supertest from 'supertest'
const request = supertest('https://api.trademe.co.nz/v1/Categories')

describe('GET REQUESTS', () =>{
    it('GET xml file', async () => {
        const response = await request.get('.xml')
        // 200 OK
        expect(response.status).toBe(200)
    })
    it('GET json file with subcategory', async () => {
        const response = await request.get('/0001-.json')
        // 200 OK
        expect(response.status).toBe(200)
        expect(response.body.Name).toBe('Trade Me Motors')
    })
})