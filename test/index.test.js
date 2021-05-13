import getDataFromStarChamps from "../models/hotels";

describe('Test in index.js', () => {
  test('should return array', () => {
    getDataFromStarChamps()
      .then((results) => {
        expect(typeof (results)).toBe('object');
      })
  })
});