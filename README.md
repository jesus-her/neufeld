# Neufeld Dashboard
## MANUAL DE USUARIO

Se explica de forma sencilla como se utiliza la pagina para el analisis y la recoleccion de los datos proporcionados por el personal de cada linea.

- Login
- Home
- Lineas
- Add Register
- FireBase


Como inicio se tiene que acceder con el correo y contraseña ya antes proporcionados.
(email: neufeld@admin.com, password: admin1234)

En el Home se pueden ver como inicio el "Dashboard", donde se pueden observar los datos que se proporcionan y se grafican obteniendo el promedio y el Rate rea.

Tambien vemos los botones de lineas donde podemos observar que cada linea tiene la suya, dependiendo de a cual se pertenezca se seleccionara la linea para poder registrar los datos.

Tomemos como ejemplo en la linea 1, en esta y en todas las demas se muestra el registro del tiempo que es la hora inicio y la hora fin, tambien el numero real y el producto que se realizo. Al haber proporcionado todos los datos se le da en el boton "Register", este llevara todos los datos registrados a una base de datos, que esta es nuestra FireBase.

En la FireBase se ven de forma de tablas los datos proporcionados y cada uno se le crea un ID de porfa personal, y desde este se puede modificar y\o eliminar los datos. Esto solo lo hace el administrador de la pagina para evitar datos engañosos.

Estos datos se calculan y se suben automaticamente en el Home.

> En la computadora de becarios esta el manual completo pero sin todas las imagenes
de referencia, desde aqui fue una breve explicación de como funciona el dash.



## Nota

Les dejo el codigo para que asi puedan cambiar el correo y contraseña, tambien como la direccion del FireBase.
Para poder tener acceso a todos los datos y tambien para poder agregar usuarios con un correo y contraseña es necesario cambiar la cuenta de Firebase.
[Sigue esta guía para utilizar el SDK de Firebase JavaScript.](https://firebase.google.com/docs/web/setup?hl=es-419)
y reemplaza el archivo "src/firebase.js"

No esta completa la parte de todas las graficas ya que tenia que sacar las operaciones de todos los productos y la verdad me atore en esa parte y tarde mas por lo mismo pero ya esta a un 80%.


