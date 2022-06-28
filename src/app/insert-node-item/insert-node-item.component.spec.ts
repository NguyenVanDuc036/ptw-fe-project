import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertNodeItemComponent } from './insert-node-item.component';

describe('InsertNodeItemComponent', () => {
  let component: InsertNodeItemComponent;
  let fixture: ComponentFixture<InsertNodeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertNodeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertNodeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
