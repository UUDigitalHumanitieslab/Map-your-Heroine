import { Component, NgZone, OnInit } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { animations, showState } from '../animations';
import { BackendService } from '../services/backend.service';

@Component({
    animations,
    selector: 'mh-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    burgerShow: showState;
    burgerActive = false;
    voyantUrl: string;
    faExternalLink = faExternalLinkAlt;

    constructor(private ngZone: NgZone, private backend: BackendService) { }

    ngOnInit() {
        this.backend.get('voyant-url').then(res => this.voyantUrl = res.url);
    }

    toggleBurger() {
        if (!this.burgerActive) {
            // make it active to make it visible (add a class to
            // override it being hidden for smaller screens)
            this.burgerActive = true;
            // immediately hide it
            this.burgerShow = 'hide';
            setTimeout(() => {
                this.ngZone.run(() => {
                    // trigger the transition
                    this.burgerShow = 'show';
                });
            });
            return;
        }

        this.burgerShow = this.burgerShow === 'show' ? 'hide' : 'show';
    }
}
