import { IbanComponent } from './iban.component';


describe('IBAN', () => {
  let ibanComponent = new IbanComponent();

  beforeEach(() => {
    ibanComponent.iban = 'DE68210501700012345678';
    spyOn(ibanComponent,'check');
  });

  it('should be longer than 5 characters', () => {
    ibanComponent.check();
    expect(ibanComponent.errorMsg).not.toBe('Der IBAN muss mindestens 5 Zeichen lang sein!');

    ibanComponent.iban = 'AT12';
    ibanComponent.check();
    expect(ibanComponent.errorMsg).toBe('Der IBAN muss mindestens 5 Zeichen lang sein!');
  });

  it('should be shorter than 35 characters', () => {
    ibanComponent.check();
    expect(ibanComponent.errorMsg).not.toBe('Der IBAN darf nicht länger als 34 Zeichen sein!');

    ibanComponent.iban = 'AT123456789098765432123456789098765';
    ibanComponent.check();
    expect(ibanComponent.errorMsg).toBe('Der IBAN darf nicht länger als 34 Zeichen sein!');
    expect(ibanComponent.check).toHaveBeenCalled();
  });

  xit('should have correct cheksum', () => {
    ibanComponent.check();
    expect(ibanComponent.errorMsg).not.toBe('Prüfsumme ist falsch!');

    ibanComponent.iban = 'DE69123412341234123412';
    ibanComponent.check();
    expect(ibanComponent.errorMsg).toBe('Prüfsumme ist falsch!');
  });
});
