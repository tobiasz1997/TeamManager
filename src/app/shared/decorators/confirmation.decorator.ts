import { AppInjector } from '@shared/services/app-injector.service';
import { ConfirmModalService } from '@shared/services/confirm-modal.service';
import { IConfirmModal } from '@shared/components/confirm-modal/confirm-modal.component';

export function Confirm(data: IConfirmModal) {
  return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: unknown[]) {
      const modalService = await getConfirmModalService();
      modalService.showDeleteTimerModal(data).subscribe((x: boolean | undefined) => {
        if (x) {
          return originalMethod.apply(this, args);
        }
      });
    };
  };
}

async function getConfirmModalService(): Promise<ConfirmModalService> {
  const service =
    AppInjector.injector.get<ConfirmModalService>(ConfirmModalService);
  if (service) {
    return service;
  }
  await new Promise((resolve) => setTimeout(resolve, 100));
  return getConfirmModalService();
}


