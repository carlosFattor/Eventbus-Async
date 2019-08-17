import { User } from "./user";

export class Repos {
  constructor(rep: any) {
    this.id = rep.id;
    this.nome = rep.nome;
    this.full_name = rep.full_name;
    this.owner = rep.owner;
    this.html_url = rep.html_url;
    this.description = rep.description;
    this.open_issues_count = rep.open_issues_count;
    this.license = rep.license;
    this.language = rep.languag;
  }
  id?: number;
  nome?: string;
  full_name?: string;
  owner?: User;
  html_url?: string;
  description?: string;
  open_issues_count?: number;
  license?: string;
  language?: string;
}
