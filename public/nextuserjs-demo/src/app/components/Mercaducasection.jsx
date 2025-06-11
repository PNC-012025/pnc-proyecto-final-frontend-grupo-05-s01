export default function MercaducaSection() {
    return (
      <section className="py-10 bg-background text-center">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-green-700 mb-6">MERCADUCA</h1>
          <div className="flex flex-col items-center">

            <img
              src="/mainimage.jpg" 
              alt="Mercaduca"
              className="w-full max-w-4xl rounded-lg shadow-lg mb-6"
            />
            <p className="text-lg text-foreground font-info italic">
              "Hay muchas malas razones para empezar una empresa. Pero solo hay una buena razón y creo que sabes cuál es: para cambiar el mundo."
              <br />
              <span className="font-semibold text-foreground font-info mt-2 block">
                Phil Libin – Fundador de Evernote.
              </span>
            </p>
          </div>
        </div>
      </section>
    );
  }
  