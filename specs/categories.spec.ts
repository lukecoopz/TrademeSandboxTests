import * as supertest from 'supertest';

const request = supertest('https://api.trademe.co.nz/v1/Categories');

describe('GET Requests to TradeMe API Categories', () => {
    const endpoints = [
        { path: '.xml', expectedStatus: 200, description: 'should retrieve XML file' },
        { path: '/0001-.json', expectedStatus: 200, expectedBodyName: 'Trade Me Motors', description: 'should retrieve Trade Me Motors subcategory' },
        { path: '/0002-.json', expectedStatus: 200, expectedBodyName: 'Computers', description: 'should retrieve Computers subcategory' },
        { path: '/0003-.json', expectedStatus: 200, expectedBodyName: 'Movies & TV', description: 'should retrieve Movies & TV subcategory' },
        { path: '/999-.json', expectedStatus: 400, description: 'should return 400 for non-existent subcategory' },
        { path: '/0001-0026-1255-.json', expectedStatus: 200, expectedPath: '/Trade-Me-Motors/Motorbikes/Motorbikes', expectedSubcategoriesCount: 10, description: 'should retrieve all motorbike subcategories' },
        { path: '/0001-.txt', expectedStatus: 404, description: 'should return 404 for incorrect file format' },
        { path: '\\; DROP TABLE Categories;-.json', expectedStatus: 404, description: 'should handle SQL injection attempt' }
    ];

    endpoints.forEach(endpoint => {
        it(endpoint.description, async () => {
            const response = await request.get(endpoint.path);

            expect(response.status).toBe(endpoint.expectedStatus);

            if (endpoint.expectedBodyName) {
                expect(response.body.Name).toBe(endpoint.expectedBodyName);
            }

            if (endpoint.expectedPath) {
                expect(response.body.Path).toBe(endpoint.expectedPath);
            }

            if (endpoint.expectedSubcategoriesCount !== undefined) {
                expect(response.body.Subcategories.length).toEqual(endpoint.expectedSubcategoriesCount);
            }
        });
    });
});