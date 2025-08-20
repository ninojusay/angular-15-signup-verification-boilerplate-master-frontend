import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    accounts: any[] = [];  // Accounts array
    searchQuery: string = '';  // Search query for filtering accounts

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        // Fetch all accounts from the API
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => {
                this.accounts = accounts;
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

    // Delete account logic
    deleteAccount(id: string) {
        const account = this.accounts.find(x => x.id === id);
        if (account) {
            account.isDeleting = true;
            this.accountService.delete(id)
                .pipe(first())
                .subscribe(() => {
                    this.accounts = this.accounts.filter(x => x.id !== id);
                });
        }
    }
}
