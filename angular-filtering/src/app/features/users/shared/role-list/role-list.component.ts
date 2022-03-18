import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserRoleItem } from '../models/user-role-item';
import { UserRoleListMode } from '../models/UserRoleListMode';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit, OnChanges {
  @Input() roleItems: UserRoleItem[] = [];
  @Input() filter: string = '';
  @Input() title: string = 'Unknown';
  @Input() mode: UserRoleListMode = UserRoleListMode.Read;
  theTrackName = 'name';
  filteredRoleItems: UserRoleItem[] = [];
  visibleLimit = 5;
  defaultLimit = 5;  // starting value
  maxLimit = 100000; // Everything is visible

  showAll: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.resetMode();

    this.theTrackName = this.title.replace(/\s/g, '');
    if (this.theTrackName === null || this.theTrackName === undefined || this.theTrackName.length === 0) {
      this.theTrackName = 'name';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filter) {
      this.filterItems();
    }
    else if (changes.roleItems) {
      console.log("role items changed.")
      this.filterItems();
    }
    else if (changes.title) {
      console.log('Title changed')
    }
    else if (changes.mode) {
      this.resetMode();
    }
  }
  
  resetMode() {
    this.showAll = this.mode === UserRoleListMode.Write;
    this.visibleLimit = this.showAll ? this.maxLimit : this.defaultLimit;
  }

  filterItems(): void {
    if (this.filter === "" || this.filter === undefined) {
      this.filteredRoleItems = this.roleItems;
    }
    else {
      const lowercaseFilter = this.filter.toLowerCase();
      this.filteredRoleItems = this.roleItems.filter(function (item) {
        return item.name.toLowerCase().indexOf(lowercaseFilter) !== -1;
      });
    }
  }

  isReadOnlyMode(): boolean {
    return this.mode === UserRoleListMode.Read;
  }

  trackName(index: number, userRole: UserRoleItem): string {
    return '${this.theTrackName}${userRole.id}';
  }

  toggleVisibleLimit(): void {
    this.showAll = !this.showAll;
    this.visibleLimit = this.showAll ? this.maxLimit : this.defaultLimit;
  }

}
