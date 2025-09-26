
export const plantsData = [
    { id: 1, name: 'Monstera Deliciosa', category: 'interior', categoryName: 'Plantas de Interior', price: 45.99, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop&crop=center', description: 'Una hermosa planta tropical con hojas grandes y perforadas, perfecta para espacios interiores luminosos.', care: 'Luz indirecta brillante, riego semanal, alta humedad' },
    { id: 2, name: 'Fiddle Leaf Fig', category: 'interior', categoryName: 'Plantas de Interior', price: 65.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center', description: 'Elegante planta de interior con hojas grandes en forma de violín que añade un toque moderno a cualquier espacio.', care: 'Luz brillante indirecta, riego moderado, ambiente estable' },
    { id: 3, name: 'Pothos Golden', category: 'interior', categoryName: 'Plantas de Interior', price: 25.99, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=400&fit=crop&crop=center', description: 'Planta colgante de fácil cuidado con hojas en forma de corazón y variegación dorada.', care: 'Luz baja a media, riego cuando el suelo esté seco, muy resistente' },
    { id: 4, name: 'Echeveria Elegans', category: 'suculentas', categoryName: 'Suculentas', price: 18.99, image: 'https://images.unsplash.com/photo-1525825691042-e14d9042fc70?w=400&h=400&fit=crop&crop=center', description: 'Suculenta en forma de roseta con hojas azul-verdosas y bordes rosados, ideal para principiantes.', care: 'Luz solar directa, riego escaso, buen drenaje' },
    { id: 5, name: 'Jade Plant', category: 'suculentas', categoryName: 'Suculentas', price: 32.99, image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&h=400&fit=crop&crop=center', description: 'Suculenta robusta con hojas carnosas y brillantes, conocida como el árbol del dinero.', care: 'Luz brillante, riego profundo pero poco frecuente, temperatura estable' },
    { id: 6, name: 'Aloe Vera', category: 'suculentas', categoryName: 'Suculentas', price: 28.99, image: 'https://images.unsplash.com/photo-1509423350716-97f2360af42e?w=400&h=400&fit=crop&crop=center', description: 'Planta medicinal con propiedades curativas, perfecta para el hogar y fácil de cuidar.', care: 'Luz solar directa, riego mínimo, suelo bien drenado' },
    { id: 7, name: 'Lavanda', category: 'aromaticas', categoryName: 'Plantas Aromáticas', price: 22.99, image: 'https://images.unsplash.com/photo-1611909023032-2d9b3c81ab03?w=400&h=400&fit=crop&crop=center', description: 'Fragante planta aromática con flores púrpuras, ideal para relajación y uso culinario.', care: 'Pleno sol, suelo bien drenado, riego moderado' },
    { id: 8, name: 'Rosemary', category: 'aromaticas', categoryName: 'Plantas Aromáticas', price: 19.99, image: 'https://images.unsplash.com/photo-1583393342767-5b24e346fe64?w=400&h=400&fit=crop&crop=center', description: 'Hierba aromática perenne con hojas en forma de aguja, perfecta para cocinar.', care: 'Sol pleno, suelo seco y bien drenado, riego escaso' },
    { id: 9, name: 'Spider Plant', category: 'colgantes', categoryName: 'Plantas Colgantes', price: 24.99, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop&crop=center', description: 'Planta colgante de fácil propagación con hojas largas y variegadas, perfecta para cestas.', care: 'Luz indirecta brillante, riego regular, alta humedad' },
];

export const getCategories = () => {
    const iconByCat = { interior: '🏡', suculentas: '🌵', aromaticas: '🌿', colgantes: '🪴' };
    const categories = [...new Set(plantsData.map((p) => p.category))];
    return categories.map((category) => {
        const plant = plantsData.find((p) => p.category === category);
        return { id: category, name: plant.categoryName, slug: category, icon: iconByCat[category] || '🌱' };
    });
};


export const getPlantsByCategory = (category) => {
    if (category === 'all' || !category) return plantsData;
    return plantsData.filter((p) => p.category === category);
};


export const getPlantById = (id) => plantsData.find((p) => p.id === parseInt(id));


export default plantsData;