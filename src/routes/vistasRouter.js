import { Router } from 'express';
import ProductsMongoDAO from '../dao/ProductsMongoDAO.js';
import CartsMongoDAO from '../dao/CartsMongoDAO.js'; // Asegúrate de importar el DAO correcto

export const router = Router();

// Ruta para mostrar la vista del carrito
router.get('/cart', async (req, res) => {
  const cartId = req.query.cartId || 'defaultCartId'; // Obtener el ID del carrito, por defecto si no se pasa uno
  try {
    const cart = await CartsMongoDAO.getCartById(cartId); // Asumiendo que tienes un método getCartById en el DAO

    res.render("cart", { 
      cartItems: cart.products || [], // Renderizar productos del carrito
      cartId 
    });
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).send({ error: 'Error al obtener el carrito' });
  }
});

// Ruta para renderizar la vista de productos con paginación y filtros
router.get("/", async (req, res) => {
  let { page = 1, limit = 10, sort = "asc", category, status } = req.query;

  // Conversión de parámetros
  page = Number(page) > 0 ? Number(page) : 1;
  limit = Number(limit) > 0 ? Number(limit) : 10;
  sort = sort.toLowerCase() === "desc" ? -1 : 1;

  let filter = {};
  if (category) filter.category = category;
  if (status !== undefined && status !== '') filter.status = status === "true";

  try {
    const products = await ProductsMongoDAO.getProductsPaginate(page, limit, filter, { price: sort });

    if (page > products.totalPages) {
      return res.redirect(`/products?limit=${limit}&sort=${sort}&category=${category || ''}&status=${status || ''}&page=${products.totalPages}`);
    }

    // Generar enlaces de navegación
    const baseUrl = `/products?limit=${limit}&sort=${sort}&category=${category || ''}&status=${status || ''}`;
    const prevLink = products.hasPrevPage ? `${baseUrl}&page=${products.prevPage}` : null;
    const nextLink = products.hasNextPage ? `${baseUrl}&page=${products.nextPage}` : null;

    // Renderizado de la página de productos
    res.render('products', {
      products: products.docs,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.prevPage || null,
      nextPage: products.nextPage || null,
      page: products.page,
      totalPages: products.totalPages,
      prevLink: prevLink,
      nextLink: nextLink,
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).send({ error: 'Error al obtener los productos' });
  }
});

// Ruta para ver los detalles de un producto
router.get('/:pid', async (req, res) => {
  const { pid } = req.params; // Obtener el ID del producto desde la URL
  try {
    const product = await ProductsMongoDAO.getProductById(pid); // Obtener producto por ID
    if (product) {
      res.render('productDetails', { product }); // Renderizar detalles del producto
    } else {
      res.status(404).send('Producto no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).send({ error: 'Error al obtener el producto' });
  }
});

// Ruta para mostrar la vista del carrito
router.get("/view", (req, res) => {
  res.render("carts"); // Usa res.render para renderizar la vista handlebars
});

export default router;
