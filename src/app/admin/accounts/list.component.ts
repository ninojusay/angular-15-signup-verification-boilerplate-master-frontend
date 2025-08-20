import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  accounts: any[] = [];  // Accounts array
  searchQuery: string = '';  // Search query for filtering accounts
  pageSize: number = 5;  // Number of items per page
  currentPage: number = 1;  // Current page number
  totalPages: number = 1;  // Total number of pages

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    // Fetch all accounts from the API
    this.accountService.getAll()
      .pipe(first())
      .subscribe(accounts => {
        this.accounts = accounts;
        this.totalPages = Math.ceil(this.accounts.length / this.pageSize); // Update total pages
      });
  }

  // Getter for filtered accounts based on the search query
  get filteredAccounts() {
    if (!this.searchQuery) {
      return this.accounts;  // If no search query, return all accounts
    }
    return this.accounts.filter(account =>
      account.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      account.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      account.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      account.role.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Pagination logic to change the page
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return; // Ensure valid page number
    this.currentPage = page;
  }

  // Paginated accounts based on current page and page size
  get paginatedAccounts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    return this.filteredAccounts.slice(startIndex, endIndex);
  }

  // Delete account logic
  deleteAccount(id: string) {
    const account = this.accounts.find(x => x.id === id);
    if (account) {
      account.isDeleting = true;
      this.accountService.delete(id)
        .pipe(first())
        .subscribe(() => {
          this.accounts = this.accounts.filter(x => x.id !== id);
          this.totalPages = Math.ceil(this.accounts.length / this.pageSize); // Update total pages
        });
    }
  }
}
