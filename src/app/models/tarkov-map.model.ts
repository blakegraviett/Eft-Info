export class TarkovMapModel {
  constructor(
    public id: String,
    public name: String,
    public raidTime: Number,
    public numPlayers: String,
    public enemies: [String],
    public keys: [{}],
    public mapImageLink: String
    ) {}
}
