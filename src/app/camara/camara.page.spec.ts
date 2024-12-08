import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamaraPage } from './camara.page';
import { MenuController } from '@ionic/angular'; // Importación del controlador de menú.
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importación de Camera.

describe('CamaraPage', () => {
  let component: CamaraPage; // Declaramos una variable para el componente.
  let fixture: ComponentFixture<CamaraPage>; // Variable para manejar el entorno de pruebas.
  let menuControllerSpy: jasmine.SpyObj<MenuController>; // Espía para simular el comportamiento del menú.

  beforeEach(async () => {
    // Creamos un espía para simular el comportamiento del menú.
    menuControllerSpy = jasmine.createSpyObj('MenuController', ['close']);

    await TestBed.configureTestingModule({
      declarations: [CamaraPage], // Declaramos el componente.
      providers: [
        { provide: MenuController, useValue: menuControllerSpy }, // Inyectamos el espía del menú.
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CamaraPage); // Creamos la instancia del componente.
    component = fixture.componentInstance; // Asignamos la instancia.
    fixture.detectChanges(); // Detectamos cambios iniciales.
  });

  it('should create the component', () => {
    // Verificamos que el componente se crea correctamente.
    expect(component).toBeTruthy();
  });

  it('should close the menu on initialization', () => {
    // Verificamos que el menú se cierra al inicializar.
    expect(menuControllerSpy.close).toHaveBeenCalledOnceWith('mainMenu');
  });


  /*
  it('should call captureImage and handle errors', async () => {
    // Espía para simular el comportamiento de Camera.
    spyOn(Camera, 'getPhoto').and.returnValue(
      Promise.resolve({
        dataUrl: 'data:image/png;base64,somebase64string', // Valor simulado de imagen.
        format: 'jpg',
      })
    );

    await component.captureImage(); // Llamamos al método.

    // Verificamos que la imagen capturada se asigna correctamente.
    expect(component.capturedImage).toBe('data:image/png;base64,somebase64string');
  });
*/

  it('should handle errors in captureImage', async () => {
    // Simulamos un error al capturar la imagen.
    spyOn(Camera, 'getPhoto').and.returnValue(Promise.reject('Error al capturar la imagen'));

    await component.captureImage(); // Llamamos al método.

    // Verificamos que el error se maneja y no afecta al flujo.
    expect(component.capturedImage).toBeUndefined();
  });
});
