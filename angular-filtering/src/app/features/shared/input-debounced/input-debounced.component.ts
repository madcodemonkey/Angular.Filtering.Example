import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-input-debounced',
  templateUrl: './input-debounced.component.html',
  styleUrls: ['./input-debounced.component.css']
})
export class InputDebouncedComponent implements OnInit, OnDestroy {
  private searchTerms = new Subject<string>();
  private searchTermsSubscription$: Subscription | null = null;

  /** Called after the debounce interval has expired (the user stops typing) */
  @Output() onChanged = new EventEmitter<string>();

  /** The debounce interval in milliseconds  */
  @Input() debounceInterval = 300;

  /** And id to assigne to the underlying input component */
  @Input() newId = "";

  constructor() { }

  ngOnDestroy(): void {
    // Unsubscribe from this.searchTerms
    if (this.searchTermsSubscription$ != null)
    {
      this.searchTermsSubscription$.unsubscribe();
    }

    // Complete this.searchTerms
    this.searchTerms.complete();
  }

  ngOnInit(): void {
    this.searchTermsSubscription$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(this.debounceInterval),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
    ).subscribe(s => this.searchChange(s));
  }

  /**
  * Push a search term into the observable stream.
  * @param term The text typed by the user.
  */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /**
   * When the user types text, it is shoved into the Subject behavior named, searchTerms, and we
   * subscribe to those changes in ngOnInit and they call this function to change the searchFilter
   * @param term search text.
   */
  searchChange(term: string): void {
    this.onChanged.next(term);
  }
}
