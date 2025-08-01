import { Component } from '@angular/core';
import { AccountService } from './_services';
import { Account, Role } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    Role = Role;
    account?: Account | null;
    selectedOption: string = '';  // Variable to store the selected option

    constructor(private accountService: AccountService) {
        this.accountService.account.subscribe(x => this.account = x);
    }

    logout() {
        this.accountService.logout();
    }

    // Function to close the navbar when a link or select is clicked
    collapseNavbar() {
        const navbarCollapse = document.getElementById('navbarNav') as HTMLElement;
        
        // This will close the navbar by removing the 'show' class
        if (navbarCollapse) {
            navbarCollapse.classList.remove('show');
        }
    }

    // Function to handle select change and apply color
    onSelectChange(event: any) {
        this.selectedOption = event.target.value;

        // Call collapseNavbar to hide the navbar after selecting an option
        this.collapseNavbar();
    }
}
