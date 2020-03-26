const users = [{name: 'Hugo', score: 250}, {name: 'Francesco', score: 300}];

test('we should have score: 250 and score: 300', () => {
  expect(users).toEqual(
    expect.arrayContaining([
      expect.objectContaining({score: 250}),
      expect.objectContaining({score: 300})
    ])
  );
});