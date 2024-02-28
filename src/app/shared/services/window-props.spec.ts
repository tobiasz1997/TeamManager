import { WindowPropsService } from '@shared/services/window-props.service';
import { ScreenSizesEnum } from '@shared/enums/screen-sizes.enum';
import { combineLatest, first } from 'rxjs';

describe('WindowProps', () => {
  let service: WindowPropsService;
  const mobileCase = 640;
  const tabletCase = 641;
  const desktopCase = 769;
  const desktopXLCase = 1025;

  beforeEach(() => {
    service = new WindowPropsService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should return MOBILE enum and true for value = ${mobileCase}`, (done) => {
    service.setMediaBreakpoint(mobileCase);

    combineLatest([service.breakpoint$, service.isSM$])
      .pipe(first())
      .subscribe(([breakpoint, bool]) => {
        expect(breakpoint).toEqual(ScreenSizesEnum.Mobile);
        expect(bool).toEqual(true);
        done();
      });
  });

  it(`should return TABLET enum and true for value = ${tabletCase}`, (done) => {
    service.setMediaBreakpoint(tabletCase);

    combineLatest([service.breakpoint$, service.isMD$])
      .pipe(first())
      .subscribe(([breakpoint, bool]) => {
        expect(breakpoint).toEqual(ScreenSizesEnum.Tablet);
        expect(bool).toEqual(true);
        done();
      });
  });

  it(`should return DESKTOP enum and true for value = ${desktopCase}`, (done) => {
    service.setMediaBreakpoint(desktopCase);

    combineLatest([service.breakpoint$, service.isLG$])
      .pipe(first())
      .subscribe(([breakpoint, bool]) => {
        expect(breakpoint).toEqual(ScreenSizesEnum.Desktop);
        expect(bool).toEqual(true);
        done();
      });
  });

  it(`should return DESKTOP XL enum and true for value = ${desktopXLCase}`, (done) => {
    service.setMediaBreakpoint(desktopXLCase);

    combineLatest([service.breakpoint$, service.isXL$])
      .pipe(first())
      .subscribe(([breakpoint, bool]) => {
        expect(breakpoint).toEqual(ScreenSizesEnum.DesktopXL);
        expect(bool).toEqual(true);
        done();
      });
  });
});
