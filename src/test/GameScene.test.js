import GameScene from '../Scenes/GameScene';

const game = new GameScene();
describe('Player test', () => {
  it('game scene', () => {
    expect(game).toBeInstanceOf(Object);
  });
});