## CRUD en JavaScript
## Comandos de ejecución
Comando para correr los datos del archivo db.json en un puerto de nuestro localhost
```js
json-server --watch db.json
```

Browser sync: browser-sync start --server --file . --host --port 5000 --startPath screens/lista_cliente.html

## Descripción del proyecto
CRUD para agregar, editar, eliminar y mostrar clientes, utilizando manejo de promises y bd simulada con archivo .json

- Carpeta **service** para manejar conexión al localhost, en nuestro puerto local habrá un servidor simulado con la base de datos .json
- Carpeta **service** utiliza los métodos que le proporciona service, para cada método del CRUD en la interfaz Visual.
