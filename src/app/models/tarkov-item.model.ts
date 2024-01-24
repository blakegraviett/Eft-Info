export class TarkovItemModel {
  constructor(
    public name: String,
    public types: String[],
    public iconLink: String,
    public size: String,
    public sellFor: [{}]
    ) {}
}
