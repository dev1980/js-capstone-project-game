import 'phaser';

export default class DisplayScore extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  async create() {
    let y = 100;
    const score = await this.displayScore();
    for (let i = 0; i < score.length; i += 1) {
      y += 20;
      this.add.text(30, y, `player: ${score[i].user} score: ${score[i].score}`, { fill: '#fff' });
    }
  }

  async displayScore() {
    const score = await this.getScoreboard();
    return score.result;
  }

  async getScoreboard() {
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/quDNZqIoDEWvWqkfQrOG/scores/')
      .then((response) => response.json())
      .then((response) => {
        const result = response;
        return result;
      })
      .catch(() => {
      });
  }
}