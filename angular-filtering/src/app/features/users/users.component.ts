import { Component, OnInit } from '@angular/core';
import { Subject  } from 'rxjs';
import { UserRoleItem } from './shared/models/user-role-item';
import { UserRoleListMode } from './shared/models/UserRoleListMode';
import {  debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  regions: UserRoleItem[] = [];
  jurisdictions: UserRoleItem[] = [];
  services: UserRoleItem[] = [];
  entities: UserRoleItem[] = [];
  segments: UserRoleItem[] = [];
  version = 0;
  searchFilter: string = "";
  mode: UserRoleListMode = UserRoleListMode.Read;

  private searchTerms = new Subject<string>();

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  constructor() { }

  ngOnInit(): void {
    this.createData(this.version);

    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
    ).subscribe(s => this.searchChange(s));
  }

  searchChange(term: string) : void {
    this.searchFilter = term;
    console.log(`Search term: ${term}`);
  }

  changeList() {
    this.version++;
    this.createData(this.version);
  }

  createData(version: number): void {
    this.regions = [
      { id: 1, name: 'Global Access', selected: false },
      { id: 2, name: 'Project Creator', selected: false }
    ];

    this.addVersion(this.regions, version);

    this.jurisdictions = [
      { id: 1, name: 'Belgium', selected: false },
      { id: 2, name: 'France', selected: false },
      { id: 3, name: 'Norway', selected: false },
      { id: 4, name: 'Netherlands', selected: false },
    ];

    this.addVersion(this.jurisdictions, version);

    this.services = [
      { id: 1, name: 'Belgium / Indirect Foo', selected: false },
      { id: 2, name: 'France / Entity ABC', selected: false },
      { id: 3, name: 'France / Entity 123', selected: false },
      { id: 4, name: 'Netherlands / Stuff', selected: false },
    ];

    this.addVersion(this.services, version);

  }

  addVersion(theArray: UserRoleItem[], version: number) {
    if (version === 0) return;
    theArray.forEach(element => {
      element.name += ` ${version}`
    });
  }

  toggleMode() {
    if (this.mode === UserRoleListMode.Read)
      this.mode = UserRoleListMode.Write;
    else this.mode = UserRoleListMode.Read;
  }

  getMode() :string{
    return this.mode === UserRoleListMode.Read ? "Read" : "Write"
  }

  countSelectedItems() :void{
    let count = 0;
    count += this.regions.filter(w => w.selected === true).length;
    count += this.jurisdictions.filter(w => w.selected === true).length;
    count += this.services.filter(w => w.selected === true).length;
    count += this.entities.filter(w => w.selected === true).length;
    count += this.segments.filter(w => w.selected === true).length;

    console.log(`Count of selected items = ${count}`);


  }
}
