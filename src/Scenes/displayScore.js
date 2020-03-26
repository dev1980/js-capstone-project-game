import 'phaser';

export default class DisplayScore extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  async create() {
    let y = 50;
    const score = await this.displayScore();
    function filteredItems() {
      const filteredItems = score.filter((item) => item.score >= 200);
      return filteredItems;
    }
    const filteredData = filteredItems();
    for (let i = 0; i < filteredData.length; i += 1) {
      y += 20;
      this.add.text(30, y, `player: ${filteredData[i].user} score: ${filteredData[i].score}`, { fill: '#fff' });
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
    } catch (err) {
      console.log('error unable to fetch the data Please try again!');
    }
    return undefined;
  }
}
