import { ConfirmModalComponent } from './confirm-modal.component';
import { matDialogRefMock } from '@mocks/global-mocks';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;

  beforeEach(async () => {
    component = new ConfirmModalComponent(matDialogRefMock, { question: '', confirmButtonText: '' });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on close should call close function', () => {
    component.onClose();
    expect(matDialogRefMock.close).toHaveBeenCalled();
  });

  it('on confirm should call close function with parameter', () => {
    component.onConfirm();
    expect(matDialogRefMock.close).toHaveBeenCalledWith(true);
  });
});
