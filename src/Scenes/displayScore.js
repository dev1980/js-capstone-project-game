/* eslint-disable no-console */
import 'phaser';

export default class DisplayScore extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  preload() {

  }

  async create() {
    let y = 50;
    const score = await this.displayScore();
    const arrScore = [];
    function filteredItems() {
      const filteredItems = score.filter((item) => {
        if (item.score >= 200 && arrScore.indexOf(item.user) == -1) {
          arrScore.push(item.user);
          return item;
        }
      });
      return filteredItems;
    }
    const filteredData = filteredItems();
    for (let i = 0; i < filteredData.length; i += 1) {
      y += 20;
      this.add.text(30, y, `player: ${filteredData[i].user} score: ${filteredData[i].score}`, { fill: '#fff' });
    }
    this.playAgain = this.add.text(300, 300, 'Click To Reload Game', { fontSize: '32px', fill: '#000' });
    this.input.on('pointerdown', () => this.scene.start('Boot'));
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
