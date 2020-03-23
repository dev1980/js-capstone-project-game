import GameScene from '../Scenes/GameScene';

const game = new GameScene();

describe('Player test', () => {
  it('game score', () => {
    expect(game).toBeInstanceOf(Object);
  });
});