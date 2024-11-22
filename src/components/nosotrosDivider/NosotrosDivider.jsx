
export default function NosotrosDivider() {
    return (
        <section className="relative w-full mt-12  overflow-hidden flex flex-col  md:flex-row">
            <div className="md:w-1/2 bg-gray-900 flex items-center justify-center px-6 py-16 md:px-0 md:py-0 ">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-bold text-white mb-4">Experiencia Portaflex</h2>
                    <p className="text-lg text-white">
                        En Portaflex, nos enorgullece ofrecer una experiencia única en la elaboración de Productos de hogar y construccion, fusionando calidad excepcional y precios asequibles. Nos especializamos en la confección de productos utilizando Plastico elaborado y fundido, metales, asegurando un equilibrio perfecto entre precio y calidad. Con un compromiso arraigado en la artesanía, cada uno de nuestros productos refleja la dedicación y la habilidad de nuestros trabajadores.
                    </p>
                </div>
            </div>
            <div className="relative  md:w-1/2 h-[400px] md:h-[500px]">
                <img
                    className="object-cover  w-full h-full"
                    src='/trabajadores.jpg'
                    alt="Imagen representativa del negocio"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
        </section>
    )
}