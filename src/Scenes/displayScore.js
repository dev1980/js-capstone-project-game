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
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/quDNZqIoDEWvWqkfQrOG/scores/',
      );
      const result = await response.json();
      return result;
    } catch(() => {
    })
    return undefined;
  }
}