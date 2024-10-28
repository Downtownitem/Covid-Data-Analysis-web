import React from "react";

const About: React.FC = () => {
  return (
    <div className="h-screen overflow-y-auto p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Logo de la Universidad del Norte */}
        <div className="flex justify-center mb-8">
          <img
            src="/icons/Logo_uninorte_colombia.jpg"
            alt="Logo de la Universidad del Norte"
            className="h-24"
          />
        </div>
        {/* Información de los autores */}
        <div className="text-center mb-8">
          <p className="text-lg font-semibold">
            Martínez Medina, Daniel. 200180871
          </p>
          <p className="text-lg font-semibold">
            Moreno Gutiérrez, Jairo. 200177423
          </p>
          <p className="text-lg font-semibold">
            Murillo Galindo, Nicole. 200181355
          </p>
        </div>

        {/* Título y subtítulo */}
        <h1 className="text-4xl font-bold text-center mb-4">
          Covid Data Analysis, Grupo presencial 2172, Universidad del Norte
        </h1>
        <h2 className="text-2xl font-medium text-center mb-8">
          Miguel Ángel Jimeno Paba
          <br />
          Octubre 26 de 2024
        </h2>

        {/* RESUMEN */}
        <h2 className="text-3xl font-semibold mb-4">RESUMEN</h2>
        <p className="text-justify italic mb-4">
          El presente informe tiene como objetivo general detallar el proceso de
          presentar información visual al público o al cliente. En la
          actualidad, tanto las empresas como las administraciones públicas
          deben afrontar el desafío de administrar grandes volúmenes de
          información y decidir la mejor forma de exhibirla. Esto es esencial
          para que los usuarios tengan la capacidad de leer, interpretar y
          obtener nuevos conocimientos a partir de los datos presentados.
        </p>
        <p className="text-justify italic mb-4">
          En primera instancia, se realizó un análisis detallado de base de
          datos, permitiendo así el correcto desarrollo del proyecto. A partir
          de este análisis, se desarrolló un diseño web que combina todos los
          requerimientos mencionados por el docente.
        </p>
        <p className="text-justify italic mb-8">
          <strong>Palabras clave:</strong> Análisis, Diseño web, Información,
          Requerimientos.
        </p>

        {/* ABSTRACT */}
        <h2 className="text-3xl font-semibold mb-4">ABSTRACT</h2>
        <p className="text-justify italic mb-4">
          The overall objective of this report is to outline the process of
          presenting visual information to the public or customers. Today,
          businesses and public administrations alike are faced with the
          challenge of managing large volumes of information and deciding how
          best to display it. This is essential for users to be able to read,
          interpret and gain new insights from the data presented.
        </p>
        <p className="text-justify italic mb-4">
          In the first instance, a detailed database analysis was carried out,
          thus allowing the correct development of the project. From this
          analysis, a web design was developed that combines all the
          requirements mentioned by the teacher.
        </p>
        <p className="text-justify italic mb-8">
          <strong>Keywords:</strong> Analysis, Web design, Information,
          Requirements.
        </p>

        {/* Secciones en dos columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna 1 */}
          <div>
            {/* Introducción */}
            <h2 className="text-3xl font-semibold mb-4">1. INTRODUCCIÓN</h2>
            <p className="text-justify mb-4">
              Covid Data Analysis es una página web con un menú distribuido en
              tres categorías las cuales contienen diferentes ítems. Ante la
              necesidad creciente de mejorar la forma en cómo se presentan los
              datos al público, es esencial diseñar un aplicativo web robusto
              que ofrezca un acceso rápido y fiable a los datos de algún sector,
              como los datos del Covid-19 y las influencias que este tuvo en su
              momento.
            </p>
            <p className="text-justify mb-4">
              Este informe se enfoca en el desarrollo de un diseño acorde que no
              solo garantice un tiempo de respuesta óptimo al presentar los
              datos, sino que también integre ayudas visuales en los enlaces de
              diferentes datos para asegurar que los usuarios puedan leerlos,
              interpretarlos y obtener nuevos conocimientos a partir de los
              datos presentados. El diseño se fundamenta en una evaluación
              detallada del conjunto de datos, ya sea por recuperados, casos,
              muertos, etc.
            </p>
            <p className="text-justify mb-8">
              Además, se busca que la interfaz sea intuitiva y accesible,
              permitiendo a los usuarios navegar con facilidad entre las
              distintas secciones. La implementación de gráficos interactivos y
              visualizaciones dinámicas proporcionará una experiencia más
              enriquecedora, facilitando la comprensión de tendencias y patrones
              en los datos. Con este enfoque, Covid Data Analysis no solo se
              propone informar, sino también empoderar a los usuarios para que
              tomen decisiones basadas en información precisa y actualizada.
            </p>

            {/* Metodología */}
            <h2 className="text-3xl font-semibold mb-4">3. METODOLOGÍA</h2>
            <p className="text-justify mb-4">
              La metodología para el desarrollo de Covid Data Analysis es
              abordada de forma modular para el correcto manejo de los datos.
              Esta metodología se compone de varias fases interrelacionadas, que
              van desde la definición de objetivos hasta el mantenimiento y
              actualización del sitio web. Cada etapa está orientada a asegurar
              que el resultado final no solo cumpla con los requisitos técnicos,
              sino que también ofrezca una experiencia intuitiva y enriquecedora
              para el usuario. A través de un análisis riguroso de datos, un
              diseño centrado en el usuario y la integración de visualizaciones
              efectivas, se busca crear una herramienta que permita a los
              usuarios interpretar la información de manera rápida y efectiva,
              facilitando la toma de decisiones informadas garantizando que
              Covid Data Analysis se convierta en un recurso valioso y confiable
              en un contexto de información en constante evolución.
            </p>
            <ol className="list-decimal list-inside mb-8 space-y-4">
              <li>
                <strong>Definición de objetivos:</strong>
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li>
                    Objetivos principales de la página web, incluyendo el
                    nombre.
                  </li>
                  <li>Establecer el público.</li>
                </ul>
              </li>
              <li>
                <strong>Análisis de datos:</strong>
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li>
                    En nuestro caso, se utilizó el dataset proporcionado por el
                    docente [1].
                  </li>
                  <li>
                    Identificar patrones, tendencias y áreas de este dataset.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Diseño:</strong>
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li>Bocetos iniciales, definiendo la interfaz.</li>
                </ul>
              </li>
              <li>
                <strong>
                  Desarrollo de todos los puntos anteriores y el resto de la
                  página web:
                </strong>
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li>Decidir qué lenguaje se usará.</li>
                  <li>
                    Configurar la base de datos, en nuestro caso se usará
                    PostgreSQL.
                  </li>
                  <li>
                    Implementación del Frontend, utilizando bibliotecas como
                    ECharts para crear gráficos interactivos.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Testing:</strong>
                <ul className="list-disc list-inside ml-5 space-y-1">
                  <li>
                    Validación de todas las funciones de Covid Data Analysis.
                  </li>
                  <li>
                    Feedback sobre la comprensión de los datos mostrados en la
                    página, para su posterior mejora, incorporando mejoras en
                    función de las sugerencias dadas por las personas.
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Columna 2 */}
          <div>
            {/* Requerimientos */}
            <h2 className="text-3xl font-semibold mb-4">2. REQUERIMIENTOS</h2>
            <ol className="list-decimal list-inside mb-8 space-y-2">
              <li>
                Datasets deben tener al menos 250,000 filas y diez columnas como
                mínimo.
              </li>
              <li>
                Deben contener una columna de fechas, la cual puede ser usada
                para trazar variables interesantes a medida que cambien con el
                tiempo.
              </li>
              <li>
                Deben contener datos numéricos y categóricos del cual se puedan
                hacer gráficas.
              </li>
              <li>
                Opcional: Información geográfica para crear mapas. Esto te
                asegurará una bonificación que podrás acumular para el Proyecto
                Final (0.5) siempre y cuando utilices también esa columna para
                hacer un gráfico en tu aplicación.
              </li>
              <li>
                Un propósito que aparece al principio de la aplicación,
                explicando por qué se crea el cuadro de mandos.
              </li>
              <li>Conjunto mínimo de 5 gráficas para mostrar información.</li>
              <li>
                Debe haber un conjunto de herramientas que los usuarios puedan
                utilizar para mostrar distinta información en los gráficos (por
                ejemplo, menús desplegables y cuadros de texto). Un mínimo de
                tres herramientas.
              </li>
              <li>Base de datos donde se cargarán los datos.</li>
            </ol>

            {/* Conclusiones */}
            <h2 className="text-3xl font-semibold mb-4">5. CONCLUSIONES</h2>
            <p className="text-justify mb-4">
              El objetivo principal de este informe definido como “detallar el
              proceso de presentar información visual al público o al cliente”,
              demuestra la importancia de presentar grandes volúmenes de datos
              de forma visual y accesible, permitiendo que tanto el público
              general como clientes específicos puedan interpretar y aprovechar
              la información para generar nuevos conocimientos. La
              implementación de un diseño web interactivo ha facilitado el
              recorrido por diferentes categorías proporcionadas por el menú de
              Covid Data Analysis, permitiendo una comprensión más clara de los
              patrones presentados en el dataset del Covid-19.
            </p>
            <p className="text-justify mb-4">
              A lo largo de este proyecto, se comprobó que la organización
              modular es fundamental para manejar estos tipos de datos de forma
              eficaz, asegurando la escalabilidad y el mantenimiento de la
              plataforma. El análisis detallado del dataset y la selección de
              una base de datos adecuada permitieron que el sitio web no solo
              cumpla con los requerimientos técnicos, sino que también
              proporcione una experiencia intuitiva para el usuario.
            </p>
            <p className="text-justify mb-8">
              Además, la inclusión de visualizaciones dinámicas y herramientas
              interactivas contribuyó a enriquecer la experiencia de usuario, al
              permitir la personalización de los datos visualizados en tiempo
              real. Estas herramientas mejoran la comprensión y el análisis de
              los datos, lo cual es esencial en un contexto de información
              cambiante como el de una pandemia.
            </p>
            <p className="text-justify mb-8">
              Por lo que Covid Data Analysis ofrece una herramienta útil y
              confiable para analizar datos complejos de manera visual,
              capacitando a los usuarios para tomar decisiones informadas.
            </p>

            {/* Referencias */}
            <h2 className="text-3xl font-semibold mb-4">REFERENCIAS</h2>
            <ol className="list-decimal list-inside mb-8 space-y-2">
              <li>
                D. K. P, «Kaggle,» 06 08 2020. [En línea]. Available:{" "}
                <a
                  href="https://www.kaggle.com/datasets/imdevskp/corona-virus-report"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.kaggle.com/datasets/imdevskp/corona-virus-report
                </a>
                . [Último acceso: 15 10 2024].
              </li>
              <li>
                C. D. Analysis, «GitHub,» 26 10 2024. [En línea]. Available:{" "}
                <a
                  href="https://github.com/Downtownitem/Covid-Data-Analysis-web.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://github.com/Downtownitem/Covid-Data-Analysis-web.git
                </a>
                .
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
