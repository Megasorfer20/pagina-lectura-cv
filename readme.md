### Comoiniciar el programa:

Para iniciar debemos adceder a las carpetas de backend y frontend, instalar los recursos e iniciar al servidor.

*Backend:

cd backend

npm i

npm start

*Frantend:

cd frontend

npm i

npm start

### Funcionamiento del front:

podes ver las diferentes cards de los campers con su respectiva descripcion y facilitamos la visualisacion mediate un filtro el cual podra buscar a los campers
segun el perfil que uno busca.

Las imagenes que no esten subidas o definidas en la base de datos entonces tomaran una por defecto.

Hay campers tambien sin descripcion esto es echo a proposito para que el camper pueda llenarmas a detalle su informacion personal.
pero no opstante existen unos que si tienen descripcion, para verla tendras que darle al boton de detalles para saber mas del camper.

Ayi encntraras mas informacion util y ademas de un generador de PDF que te facilitara mas facil la informacion para ver mas tarde o guardar los curriculums que te llamen la atencion.

Tambien al fondo estara un apartado de Formulario que nos llegara un correo a nosotros de la solicitud de un camper al que esten interesados.


*Administrador:
En el apartado de Login podemos ver que nos pide un usuario y una contaseña. el cual son los siguientes para entrar como administrador:

- usuario1
- contrasena1
  
En este apartado es mas la vista de administracion de los campers el cual le podra permitir gestionar cada camper y su respectiva descripcion.
Tambien le llegaran notificacionse de peticiones que an echo tanto interesados en los campers como ediciones que quieran hacer los mismos campers.
por ultimo tambien esta la opcion de eliminar camper por si este ya fue contratado o ya no se encuentra dispuesto para una vacante laboral.

*Camper:
En el mismo login tenemos el apartado de los campers la cual tendra el papel de tener funcionalidades que los campers necesitan en su area de formacion y la posibilidad de
poder editar su perfil. pasando por una verificacion del administrador.

- usuario2
- contrasena2

### Funcionamiento del Backend:

Enel apartado del backend tenemos los endpoints que nos permite hacer la CRUD completa de los campers.

La verificacion del Usuario Administrador y Camper

Tambien la el envio de los correos cuales tambien cumplen un papel importante al agregar los campers porque les genera un perfil con contraseña  y usuarios unicos.

en general estos serian los end points: 

Delet: 
http://localhost:5000/API/campers
http://localhost:5000/API/campersDetails
http://localhost:5000/API/users
http://localhost:5000/API/campersDetails
http://localhost:5000/API/campersDetails




http://localhost:5000/API/users


### Databsase:

Toca cambiarle el nombre a las variables, porque se pueden mejorar la base de datos.
Algunos datos pueden tener mas campos, pero no se usarian para mas adelante.

**Lengujage de programacion**

- technologyName
- technologyDescription

**Campers**

- name
- seniority
- especiality
- tecnologies
- position
- locality
- salary
- englishLevel
- photo

**Detalle Camper**

- biography
- stack
- expericency

**users**

- usuario
- contraseña
- tipoUser
- email

**tipos de usuarios**

- tipoUsuario
- descripcion tipo usuario
