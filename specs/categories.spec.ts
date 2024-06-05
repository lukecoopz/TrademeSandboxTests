import * as supertest from 'supertest'
const request = supertest('https://api.trademe.co.nz/v1/Categories')

describe('GET REQUESTS', () =>{
    it('GET xml file', async () => {
        const response = await request.get('.xml')
        // 200 OK
        expect(response.status).toBe(200)
    })
    it('GET subcategory for Trade Me Motors', async () => {
        const response = await request.get('/0001-.json')
        // 200 OK
        expect(response.status).toBe(200)
        expect(response.body.Name).toBe('Trade Me Motors')
    })
    it('GET subcategory for Computers', async () => {
        const response = await request.get('/0002-.json')
        // 200 OK
        expect(response.status).toBe(200)
        expect(response.body.Name).toBe('Computers')
    })
    it('GET subcategory for Movies & TV', async () => {
        const response = await request.get('/0003-.json')
        // 200 OK
        expect(response.status).toBe(200)
        expect(response.body.Name).toBe('Movies & TV')
    })
    it('Returns 400 with no subcategory', async () => {
        const response = await request.get('/999-.json')
        // 400 no category that is 999
        expect(response.status).toBe(400)
    })
    it('Returns all motorbike subcategories', async () => {
        const response = await request.get('/0001-0026-1255-.json')
        // 200 ok
        expect(response.status).toBe(200)
        expect(response.body.Path).toBe('/Trade-Me-Motors/Motorbikes/Motorbikes')
        expect(response.body.Subcategories.length).toEqual(10)
    })
    it('Returns 400 with incorrect file format', async () => {
        const response = await request.get('/0001-.txt')
        // 404
        expect(response.status).toBe(404)
    })

    it('Should handle sql injection', async () => {
        const response = await request.get('\; DROP TABLE Categories;-.json')
        // 404
        expect(response.status).toBe(404)
    })

})