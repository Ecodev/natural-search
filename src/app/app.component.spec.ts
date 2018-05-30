import { TestBed, async } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCheckboxModule,
    MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
    MatSidenavModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NaturalSearchModule } from '@ecodev/natural-search';
import { AppComponent } from './app.component';
import { ThemeService } from './shared/services/theme.service';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                NaturalSearchModule,
                MatInputModule,
                MatCheckboxModule,
                MatButtonModule,
                MatSidenavModule,
                MatListModule,
                MatIconModule,
                BrowserAnimationsModule,
                FlexLayoutModule,
                MatDialogModule,
                MatFormFieldModule,
            ],
            providers: [
                ThemeService,
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it(`should have a config`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.config).toBeTruthy();
    }));

    it('should render title in a h1 tag', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('Natural Search');
    }));
});
