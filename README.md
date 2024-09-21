MODIFICACIONES Y MEJORAS IMPLEMENTADAS:

-DESGARGUE EXPRESS-HANDLEBARS
-ARREGLE PAGINADO, LIMIT Y CATEGORY EN http://localhost:8080/products 
-AÑADI BOTON DE "VER CARRITO" REDIRECCIONA EN http://localhost:8080/cart Y BOTONES DE "Actualizar Cantidad" Y "Eliminar del Carrito"
-Cambie el uso de productId a product en mi DAO y rutas para alinear con el esquema cartSchema.
-Probe metodos, rutas y modelo schema + Agregue validaciones de todo tipo


CARTS:

1-GET  http://localhost:8080/api/carts                                    OK

2-GET http://localhost:8080/api/carts/{cartId}                            OK DEVUELVE EL CART BUSCADO CON PEDIDOS O VACIO + AÑADI VALIDACIONES DE SI EL CART ES INCORRECTO O POSEE FORMATO INVALIDO

3-POST http://localhost:8080/api/carts/{cartId}/products                  OK DEVUELVE EL CART CON EL PRODUCT AÑADIDO Y QUANTITY + VALIDACIONES CUANDO EL NUM DE CART ES INCORRECTO Y CUANDO DEBE SER QUANTITY MAYOR Q -1 
BODY {  "product": "66e0fca1dec613183ca795d6", "quantity": 2}

4-POST http://localhost:8080/api/carts/                                   OK    {"message": "Carrito creado","id": "66ec616080d2562c97a30bd8"}

5-PUT http://localhost:8080/api/carts/{cartId}/products/{productId}       OK
BODY {"quantity": 10}

6-PUT http://localhost:8080/api/carts/invalid-id/products/invalid-id      OK ME DA ESTA RESPUESTA { "error": "Invalid cart or product ID" } + VALIDACIONES DE CARTS O PRODUCT INVALIDO

7-PUT http://localhost:8080/api/carts/:cid                                OK AÑADE LAS MODIFICACIONES  + VALIDACIONES AVISA CUANDO EL CARRITO ES INCORRECTO 
BODY {"products": [
    { "product": "66e9c8454707407df248a23e", "quantity": 2 }
  ]}

8-DELETE http://localhost:8080/api/carts/66e0fca6dec613183ca7a872/products/66e0fca1dec613183ca795d6                OK  AÑADI VALIDACIONES TANTO SI EL CART O PROD NO EXISTEN COMO SI YA SE HABIA ELIMINADO ANTERIORMENTE

9-DELETE http://localhost:8080/api/carts/66e0fca6dec613183ca7a872/products/invalid-id                              OK {"error": "Producto no encontrado en el carrito"}

10-DELETE http://localhost:8080/api/carts/:cid                             OK ME DA ESTA RESPUESTA {"message": "Todos los productos han sido eliminados del carrito", "cart": { "_id": "66e0fca6dec613183ca7a873","products": [],  "__v": 4}} + AÑADI VALIDACION PARA Q NO SIGA ELIMINANDO PRODUCTO YA ELIMINADO TANTO PARA Q AVISE SI EL CARRITO NO EXISTE

11-DELETE http://localhost:8080/api/carts/invalid-id                       OK    {"error": "Cart with ID 66eca83bb1e60e6ef22cdb60 not found"}


PRODUCTS:

1. Obtener todos los productos (GET)
URL: http://localhost:8080/api/products

2. Crear un producto (POST)
URL: http://localhost:8080/api/products
BODY
{
  "title": "Zapatillas Air Max",
  "description": "Zapatillas de running cómodas",
  "code": "AMX2024",
  "price": 120,
  "stock": 25,
  "category": "Lifestyle",
  "thumbnails": ["image1.jpg", "image2.jpg"]
}

3. Actualizar un producto (PUT)
URL: http://localhost:8080/api/products/{productID}
BODY 
{
  "title": "Zapatillas Air Max Actualizadas",
  "description": "Nuevas zapatillas con mejor diseño",
  "price": 130,
  "stock": 30,
  "category": "Casual"
}

4. Eliminar un producto (DELETE)
URL: http://localhost:8080/api/products/{productID}

5. Filtrar productos por categoría (GET)
http://localhost:8080/api/products?category=Casual

6. Filtrar productos por limite (LIMIT)
http://localhost:8080/api/products?limit=2

7. Filtrar productos por pagina (PAGINATE)
http://localhost:8080/api/products?page=3

