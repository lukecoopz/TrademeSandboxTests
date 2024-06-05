import axios, { AxiosError } from 'axios';
import { expect } from 'chai';
import { describe, it } from 'mocha';

const BASE_URL = 'https://api.trademe.co.nz/v1/Categories.json';

// Helper function to make API requests
const getCategories = async (params = {}) => {
  try {
    const response = await axios.get(BASE_URL, { params });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

describe('Retrieve Categories API Tests', () => {

  it('should retrieve all categories successfully', async () => {
    const response = await getCategories();
    expect(response.status).to.equal(200);
    expect(response.data).to.be.an('object');
    expect(response.data.Subcategories).to.be.an('array');
  });

//   it('should handle invalid category parameter gracefully', async () => {
//     const response = await getCategories({ category: 'invalid-category' });
//     expect(response.status).to.equal(400);
//     expect(response.data).to.have.property('ErrorDescription');
//   });

//   it('should retrieve a specific category when a valid category id is provided', async () => {
//     const response = await getCategories({ category: '0345-0354-' });
//     expect(response.status).to.equal(200);
//     expect(response.data).to.be.an('object');
//     expect(response.data.Name).to.equal('Cars');
//   });

//   // Edge case: extremely high category ID
//   it('should return an error for a non-existent category id', async () => {
//     const response = await getCategories({ category: '9999-9999-' });
//     expect(response.status).to.equal(400);
//     expect(response.data).to.have.property('ErrorDescription');
//   });

//   // Security test: SQL injection attempt
//   it('should handle SQL injection attempts gracefully', async () => {
//     const response = await getCategories({ category: "'; DROP TABLE Categories; --" });
//     expect(response.status).to.equal(400);
//     expect(response.data).to.have.property('ErrorDescription');
//   });

//   // Performance test: response time should be within acceptable limits
//   it('should respond within acceptable time limits', async () => {
//     const startTime = Date.now();
//     const response = await getCategories();
//     const endTime = Date.now();
//     expect(response.status).to.equal(200);
//     expect(endTime - startTime).to.be.lessThan(2000); // 2 seconds
//   });

//   // Validate response format
//   it('should return data in correct format', async () => {
//     const response = await getCategories();
//     expect(response.status).to.equal(200);
//     expect(response.data).to.be.an('object');
//     expect(response.data.Subcategories).to.be.an('array');
//     response.data.Subcategories.forEach(category => {
//       expect(category).to.have.property('Name');
//       expect(category).to.have.property('Number');
//     });
//   });

});
