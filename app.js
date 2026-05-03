document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 1000, once: true });
    cargarProductos();
    renderCubicador();
});

async function cargarProductos() {
    const grid = document.getElementById('contenedor-catalogo');
    try {
        const respuesta = await fetch('catalogo.json');
        const data = await respuesta.json();

        grid.innerHTML = data.map(p => `
            <div class="card-shoji p-4 border border-stone-100" data-aos="fade-up">
                <div class="overflow-hidden aspect-[4/5] bg-stone-100 mb-4">
                    <img src="${p.imagen}" alt="${p.seo_alt}" class="w-full h-full object-cover">
                </div>
                <h3 class="text-xl font-serif text-stone-900">${p.nombre}</h3>
                <p class="text-xs text-stone-500 my-2">${p.desc}</p>
                <div class="flex justify-between items-center mt-4 pt-4 border-t border-stone-50">
                    <span class="font-bold text-stone-900">$${p.precio.toLocaleString('es-CL')}</span>
                    <a href="https://wa.me/56994270323?text=Cotizar%20${encodeURIComponent(p.nombre)}" 
                       class="text-[10px] font-bold uppercase tracking-widest text-[#E3B448]">Cotizar →</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error cargando catálogo:", error);
    }
}

function renderCubicador() {
    const section = document.getElementById('modulo-presupuesto');
    section.innerHTML = `
        <div class="max-w-4xl mx-auto bg-white p-10 shadow-sm border-t-4 border-[#E3B448]">
            <h2 class="font-serif text-3xl mb-4">Presupuesto Instantáneo</h2>
            <p class="text-sm text-stone-500 mb-8 italic">Ideal para proyectos de Puertas Japonesas a medida.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="number" id="ancho" placeholder="Ancho en cm" class="p-4 border border-stone-200 outline-none focus:border-[#E3B448]">
                <input type="number" id="alto" placeholder="Alto en cm" class="p-4 border border-stone-200 outline-none focus:border-[#E3B448]">
            </div>
            <button onclick="calcular()" class="mt-6 w-full bg-stone-900 text-white py-4 uppercase tracking-[0.2em] text-xs hover:bg-[#E3B448] transition">Calcular Inversión</button>
            <div id="resultado" class="mt-8 text-center text-2xl font-serif text-stone-900"></div>
        </div>
    `;
}

function calcular() {
    const w = document.getElementById('ancho').value / 100;
    const h = document.getElementById('alto').value / 100;
    const res = document.getElementById('resultado');
    if (w > 0 && h > 0) {
        const total = (w * h) * 180000; // Precio m2 base
        res.innerText = `Estimado: ${new Intl.NumberFormat('es-CL', {style: 'currency', currency: 'CLP'}).format(total)}`;
    }
}