import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Router } from '@angular/router';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { CoreEffects } from './core.effects';
import { DashboardRedirect } from '../actions/core.action';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';

describe('Core Effects', () => {
    let effects: CoreEffects;
    let metadata: EffectsMetadata<CoreEffects>;
    let actions: Observable<any>;
    let routerService: any;

    beforeEach(async(() => {


        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CoreEffects,
                provideMockActions(() => actions),
                {
                    provide: Router,
                    useClass: class {
                        navigate = jasmine.createSpy("navigate");
                    },
                },
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        effects = TestBed.get(CoreEffects);
        metadata = getEffectsMetadata(effects);
        routerService = TestBed.get(Router);
    });

    describe('dashboardRedirect$', () => {
        it('should register dashboardRedirect$ that does not dispatch an action', () => {
            expect(metadata.dashboardRedirect$).toEqual({ dispatch: false });
        });

        it('should dispatch a RouterNavigation action', () => {
            const action = new DashboardRedirect();

            actions = hot('-a---', { a: action });

            effects.dashboardRedirect$.subscribe(() => {
                expect(routerService.navigate).toHaveBeenCalledWith(['/dashboard']);
            });
        });
    });

});