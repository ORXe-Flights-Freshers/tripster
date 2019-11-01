import { async, TestBed } from '@angular/core/testing';
import { PlaceAutocompleteComponent } from './place-autocomplete.component';
describe('PlaceAutocompleteComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlaceAutocompleteComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(PlaceAutocompleteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=place-autocomplete.component.spec.js.map