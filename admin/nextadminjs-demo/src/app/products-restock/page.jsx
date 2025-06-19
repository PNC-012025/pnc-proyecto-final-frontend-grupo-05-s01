"use client";

import { useState } from 'react';

const MyReStockProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: '', price: '', description: '', category: '' },
  ]);

  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    subcategory: ''
  });

  const categories = [
    { value: 'electronica', label: 'Electrónica' },
    { value: 'alimentos', label: 'Alimentos' },
    { value: 'ropa', label: 'Ropa' },
    { value: 'hogar', label: 'Hogar' },
  ];

  const subcategories = {
    electronica: ['TV', 'Audio', 'Computación'],
    alimentos: ['Perecederos', 'No perecederos', 'Bebidas'],
    ropa: ['Hombre', 'Mujer', 'Niños'],
    hogar: ['Muebles', 'Decoración', 'Cocina'],
  };

  const handleAddProduct = () => {
    if (currentProduct.name && currentProduct.price) {
      setProducts([...products, { ...currentProduct, id: Date.now() }]);
      setCurrentProduct({
        name: '',
        price: '',
        description: '',
        category: '',
        subcategory: ''
      });
    }
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && { subcategory: '' })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Productos a enviar:', products);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">FORMULARIO DE ENTREGA DE PRODUCTOS</h1>
        
        <div className="bg-yellow-50 border-l-4 border-green-800 p-4 mb-6">
          <p className="text-yellow-700">
            <strong>Recuerda:</strong> Cada vez que desees hacer renovación de stock, debes completar
            previamente esta ficha de registro de productos y enviarla.
          </p>
          <p className="text-yellow-700 mt-2">
            <strong>Se solicita llevar el producto etiquetado.</strong>
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">DETALLES DE PRODUCTOS</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de producto</label>
              <input
                type="text"
                name="name"
                value={currentProduct.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
              <input
                type="text"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="L. 0.00"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del producto</label>
              <textarea
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría de los productos</label>
              <select
                name="category"
                value={currentProduct.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          {currentProduct.category && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subcategoría</label>
              <select
                name="subcategory"
                value={currentProduct.subcategory}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Selecciona una subcategoría</option>
                {subcategories[currentProduct.category]?.map((subcat) => (
                  <option key={subcat} value={subcat}>{subcat}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">Selecciona exactamente</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleAddProduct}
            className=" bg-secondary font-bold text-foreground px-4 py-2 rounded-md hover:bg-primary-dark transition"
          >
            AGREGAR PRODUCTO
          </button>

          {/* all productos agregados */}
          {products.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Productos Registrados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product, index) => (
                  <div key={product.id} className="border rounded-lg p-4 relative">
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                    <h4 className="font-medium">{product.name || `Producto ${index + 1}`}</h4>
                    <p className="text-gray-600">{product.price ? `L. ${product.price}` : 'Precio no especificado'}</p>
                    {product.category && (
                      <p className="text-sm text-gray-500">{product.category} {product.subcategory && `> ${product.subcategory}`}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-8">
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyReStockProducts;