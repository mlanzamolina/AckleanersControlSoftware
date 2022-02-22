Feature: Prueba de ingreso con el login

Scenario: Intentar realizar un login correcto para usuario admin
    Given Yo ingreso al login de la pagina Ackleaners
    When Ingreso el usuario correcto
    When Ingreso la contraseña correcta "contra"
    When Hago clic en el boton de iniciar sesion
    Then Puedo ingresar exitosamente