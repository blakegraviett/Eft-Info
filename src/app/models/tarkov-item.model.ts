import { publishFacade } from "@angular/compiler";

export class TarkovItemModel {
  constructor(
    public id: String,
    public name: String,
    public types: String[],
    public iconLink: String,
    public size: String,
    public sellFor: [{}],
    public link: String
    ) {}
}
