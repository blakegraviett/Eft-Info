export class TarkovItemModel {
  constructor(
    public id: String,
    public name: String,
    public types: String[],
    public iconLink: String,
    public size: Number,
    public sellFor: [{}],
    public buyFor: [{}],
    public link: String
    ) {}
}
