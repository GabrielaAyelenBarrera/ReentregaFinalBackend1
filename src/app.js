import express from "express";
import path from "path";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import { config } from "./config/config.js";
import { connDB } from "./connDB.js";
import productsRouter from "./routes/productsRouter.js";
import { router as vistasRouter } from "./routes/vistasRouter.js";
import cartsRouter from "./routes/cartsRouter.js";

const app = express();

// Configuración de Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "./views"));

// Middleware globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

// Rutas para API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Rutas para vistas
app.use('/products', vistasRouter); // Asegúrate de que `vistasRouter` maneja rutas como `/products`
app.use('/cart', (req, res) => {
  // Renderiza la vista del carrito
  res.render("carts");
});
app.use('/checkout', (req, res) => {
  res.render("checkout"); 
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send("OK");
});

// Conecta a la base de datos y luego iniciar el servidor
connDB().then(() => {
  const PORT = config.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
  });
});
