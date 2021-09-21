import { Component, OnInit, NgZone } from '@angular/core';
import { animations, showState } from '../animations';
import { ConfigService } from '../services/config.service';

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

    constructor(private ngZone: NgZone, private configService: ConfigService) { }

    ngOnInit() {
        this.configService.get().then(
            config => this.voyantUrl = config.voyantUrl
        );
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
