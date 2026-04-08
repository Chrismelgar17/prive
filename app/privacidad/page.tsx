import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Política de Privacidad | Privé Relax',
  description: 'Conocé cómo Privé Relax recopila, usa y protege tu información personal.',
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#2A153D] flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">

        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-white/40">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">Política de Privacidad</span>
        </nav>

        <h1 className="text-3xl font-bold text-white mb-2">Política de Privacidad</h1>
        <p className="text-xs text-white/40 mb-10">Última actualización: abril 2026</p>

        {/* Section anchors nav */}
        <nav className="mb-10 flex flex-wrap gap-2" aria-label="Secciones">
          {[
            ['#recopilacion', 'Datos que recopilamos'],
            ['#uso', 'Uso de datos'],
            ['#cookies', 'Cookies'],
            ['#terceros', 'Terceros'],
            ['#derechos', 'Tus derechos'],
            ['#dmca', 'DMCA'],
            ['#contacto', 'Contacto'],
          ].map(([href, label]) => (
            <a key={href} href={href}
              className="px-3 py-1 rounded-full text-xs border border-white/10 text-white/50 hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-colors">
              {label}
            </a>
          ))}
        </nav>

        <div className="space-y-10">

          <Section id="intro" title="1. Introducción">
            <p>
              Privé Relax ("nosotros", "el Sitio") opera el directorio accesible en este dominio. Esta Política de
              Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos tu información personal cuando
              visitás o utilizás el Sitio, en cumplimiento de la{' '}
              <strong>Ley N° 25.326 de Protección de Datos Personales</strong> de la República Argentina y demás
              normativa aplicable.
            </p>
            <p>
              Al usar el Sitio, aceptás las prácticas descritas en este documento. Si no estás de acuerdo, te pedimos
              que no utilices el Sitio.
            </p>
          </Section>

          <Section id="recopilacion" title="2. Datos que recopilamos">
            <p><strong>Datos que proporcionás voluntariamente:</strong></p>
            <ul>
              <li>Nombre o alias, dirección de correo electrónico y número de teléfono al registrarte como anunciante.</li>
              <li>Fotografías y descripción publicadas en tu perfil.</li>
              <li>Información de contacto (WhatsApp) publicada en el directorio.</li>
              <li>Documento de identidad en los casos en que se solicite verificación.</li>
            </ul>
            <p className="mt-3"><strong>Datos recopilados automáticamente:</strong></p>
            <ul>
              <li>Dirección IP y datos de geolocalización aproximada.</li>
              <li>Tipo de navegador, sistema operativo y dispositivo.</li>
              <li>Páginas visitadas, tiempo de sesión y acciones dentro del Sitio (analytics).</li>
              <li>Cookies y tecnologías similares (ver sección de Cookies).</li>
            </ul>
          </Section>

          <Section id="uso" title="3. Cómo usamos tus datos">
            <p>Utilizamos la información recopilada para:</p>
            <ul>
              <li>Operar, mantener y mejorar el Sitio y sus funcionalidades.</li>
              <li>Mostrar y gestionar los perfiles publicados en el directorio.</li>
              <li>Verificar la identidad y mayoría de edad de los anunciantes.</li>
              <li>Moderar contenido y prevenir actividades fraudulentas o ilegales.</li>
              <li>Cumplir con obligaciones legales ante autoridades competentes.</li>
              <li>Enviar comunicaciones administrativas o de soporte cuando sea necesario.</li>
              <li>Analizar el comportamiento de uso para mejorar la experiencia (de forma anonimizada).</li>
            </ul>
            <p>
              <strong>No vendemos ni cedemos</strong> tus datos personales a terceros con fines comerciales.
            </p>
          </Section>

          <Section id="cookies" title="4. Cookies y tecnologías de rastreo">
            <p>
              El Sitio utiliza <strong>cookies</strong> —pequeños archivos de texto almacenados en tu dispositivo— y
              tecnologías similares (local storage, pixels) para:
            </p>
            <ul>
              <li><strong>Cookies estrictamente necesarias:</strong> para el funcionamiento básico del Sitio (sesión, seguridad).</li>
              <li><strong>Cookies de analítica:</strong> para medir el tráfico y el comportamiento de los visitantes (ej. Vercel Analytics). Los datos se procesan de forma anonimizada o seudoanonimizada.</li>
              <li><strong>Cookies de preferencias:</strong> para recordar configuraciones de usuario.</li>
            </ul>
            <p>
              Podés controlar o deshabilitar las cookies desde la configuración de tu navegador. Ten en cuenta que
              deshabilitar ciertas cookies puede afectar la funcionalidad del Sitio.
            </p>
          </Section>

          <Section id="terceros" title="5. Compartición con terceros">
            <p>Podemos compartir información con terceros únicamente en los siguientes casos:</p>
            <ul>
              <li>
                <strong>Proveedores de servicios técnicos</strong> (hosting, CDN, analítica) que actúan como
                encargados del tratamiento y están obligados contractualmente a proteger tus datos.
              </li>
              <li>
                <strong>Autoridades legales</strong> cuando estemos obligados por ley, orden judicial o requerimiento
                de autoridad competente.
              </li>
              <li>
                <strong>Transferencia de negocio:</strong> en caso de fusión, adquisición o venta de activos, los datos
                podrán ser transferidos al nuevo titular, quien quedará sujeto a esta política.
              </li>
            </ul>
          </Section>

          <Section id="almacenamiento" title="6. Almacenamiento y seguridad">
            <p>
              Los datos se almacenan en servidores con medidas de seguridad técnicas y organizativas razonables
              (cifrado en tránsito, acceso restringido, monitoreo). Sin embargo, ningún sistema es completamente
              infalible. En caso de brecha de seguridad que afecte tus derechos, notificaremos conforme a la normativa
              aplicable.
            </p>
            <p>
              Los datos se conservan durante el tiempo necesario para cumplir las finalidades descritas en esta
              política, o durante el plazo que exija la legislación vigente.
            </p>
          </Section>

          <Section id="derechos" title="7. Tus derechos">
            <p>
              De conformidad con la Ley 25.326, tenés derecho a:
            </p>
            <ul>
              <li><strong>Acceso:</strong> solicitar información sobre los datos personales que tratamos sobre vos.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
              <li><strong>Supresión ("derecho al olvido"):</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios.</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos en determinadas circunstancias.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado.</li>
            </ul>
            <p>
              Para ejercer estos derechos, contactanos a través de la dirección indicada en la sección de Contacto.
              Responderemos dentro de los plazos establecidos por la normativa vigente.
            </p>
          </Section>

          <Section id="menores" title="8. Menores de edad">
            <p>
              El Sitio está dirigido exclusivamente a personas mayores de 18 años. No recopilamos intencionalmente
              datos personales de menores de edad. Si tomamos conocimiento de que hemos recopilado datos de un menor,
              los eliminaremos de inmediato. Si sos padre, madre o tutor y creés que tu hijo/a nos proporcionó datos,
              contactanos sin demora.
            </p>
          </Section>

          <Section id="enlaces" title="9. Enlaces a sitios externos">
            <p>
              El Sitio puede contener enlaces a sitios web de terceros. Esta Política de Privacidad aplica únicamente
              a Privé Relax. No somos responsables de las prácticas de privacidad ni del contenido de sitios externos,
              y te recomendamos leer sus políticas antes de proporcionarles datos.
            </p>
          </Section>

          <Section id="dmca" title="10. DMCA — Aviso de Derechos de Autor">
            <p>
              Privé Relax respeta los derechos de propiedad intelectual. Si considerás que algún contenido publicado
              en el Sitio infringe tus derechos de autor conforme a la{' '}
              <em>Digital Millennium Copyright Act (DMCA)</em> u otra normativa aplicable, podés enviarnos un aviso
              que incluya:
            </p>
            <ul>
              <li>Tu identificación como titular de los derechos o representante autorizado.</li>
              <li>Descripción de la obra protegida que considerás infringida.</li>
              <li>URL o identificación del contenido infractor dentro del Sitio.</li>
              <li>Declaración de buena fe de que el uso no está autorizado.</li>
              <li>Declaración de veracidad de la información bajo pena de perjurio.</li>
              <li>Tu firma física o electrónica.</li>
            </ul>
            <p>
              Procesaremos los avisos válidos y actuaremos con diligencia para retirar el contenido denunciado. El
              aviso debe enviarse a la dirección indicada en la sección de Contacto con el asunto "DMCA Notice".
            </p>
          </Section>

          <Section id="cambios" title="11. Cambios a esta Política">
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. La versión vigente será siempre la
              publicada en esta página, con la fecha de última actualización indicada al inicio. Te recomendamos
              revisarla con regularidad.
            </p>
          </Section>

          <Section id="contacto" title="12. Contacto">
            <p>
              Para consultas sobre esta Política, ejercicio de derechos, avisos de DMCA o cualquier otra
              comunicación relacionada con la privacidad de tus datos, podés contactarnos a:
            </p>
            <ul>
              <li><strong>Sitio:</strong> Privé Relax</li>
              <li><strong>Jurisdicción:</strong> Ciudad Autónoma de Buenos Aires, Argentina</li>
            </ul>
            <p>
              También podés consultar a la{' '}
              <strong>Agencia de Acceso a la Información Pública (AAIP)</strong> — organismo de control en materia
              de protección de datos personales en Argentina — en{' '}
              <span className="text-white/60">www.argentina.gob.ar/aaip</span>.
            </p>
          </Section>

        </div>
      </main>
      <Footer />
    </div>
  )
}

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <h2 className="text-base font-semibold text-[#D4AF37] mb-3 uppercase tracking-wider">{title}</h2>
      <div className="space-y-3 text-sm text-white/70 leading-relaxed [&_strong]:text-white [&_em]:text-white/80 [&_ul]:mt-2 [&_ul]:ml-4 [&_ul]:space-y-1.5 [&_ul]:list-disc [&_ul]:marker:text-[#D4AF37]/60">
        {children}
      </div>
    </section>
  )
}
