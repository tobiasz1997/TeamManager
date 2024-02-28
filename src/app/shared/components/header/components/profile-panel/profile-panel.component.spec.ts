import { ProfilePanelComponent } from './profile-panel.component';

describe('ProfilePanelComponent', () => {
  let component: ProfilePanelComponent;

  beforeEach(async () => {
    component = new ProfilePanelComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should on logout emit action', () => {
    const emit = jest.spyOn(component.logoutButtonClick$, 'emit').mockReset();
    component.handleLogout();

    expect(emit).toHaveBeenCalled();
  });
});
