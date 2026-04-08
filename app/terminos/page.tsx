import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Términos y Condiciones | Privé Relax',
  description: 'Leé los términos y condiciones de uso del directorio Privé Relax.',
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#2A153D] flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">

        {/* Breadcrumb */}
        <nav className="mb-6 text-xs text-white/40">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">Términos y Condiciones</span>
        </nav>

        <h1 className="text-3xl font-bold text-white mb-2">Términos y Condiciones</h1>
        <p className="text-xs text-white/40 mb-10">Última actualización: abril 2026</p>

        <div className="prose-legal space-y-8">

          <Section title="1. Aceptación de los Términos">
            <p>
              Al acceder y utilizar el sitio web <strong>Privé Relax</strong> (en adelante "el Sitio"), aceptás de forma
              expresa y sin reservas los presentes Términos y Condiciones de Uso ("T&C"). Si no estás de acuerdo con
              alguna de estas condiciones, debés abstenerte de utilizar el Sitio.
            </p>
            <p>
              El uso continuado del Sitio tras la publicación de modificaciones a estos T&C constituye la aceptación de
              dichas modificaciones.
            </p>
          </Section>

          <Section title="2. Edad mínima y público destinatario">
            <p>
              El Sitio está destinado <strong>exclusivamente a personas mayores de 18 años</strong>. Al ingresar,
              confirmás que tenés 18 años de edad o más. Si sos menor de edad, debés abandonar el Sitio de inmediato.
            </p>
            <p>
              Privé Relax se reserva el derecho de solicitar verificación de edad en cualquier momento y de bloquear el
              acceso a cualquier usuario que no pueda acreditar su mayoría de edad.
            </p>
          </Section>

          <Section title="3. Naturaleza del Servicio">
            <p>
              Privé Relax es un <strong>directorio de anuncios clasificados</strong>. El Sitio no presta, controla,
              supervisa ni garantiza los servicios ofrecidos por los anunciantes, ni actúa como intermediario,
              empleador, agencia o representante de ninguna de las partes.
            </p>
            <p>
              Los acuerdos, transacciones o interacciones entre anunciantes y usuarios son exclusivamente entre dichas
              partes. Privé Relax no asume responsabilidad alguna por el resultado de esos intercambios.
            </p>
          </Section>

          <Section title="4. Contenido de los Anuncios">
            <p>
              Los anunciantes son los únicos responsables del contenido publicado en sus perfiles, incluyendo textos,
              fotografías e información de contacto. Al publicar un perfil, el anunciante declara y garantiza que:
            </p>
            <ul>
              <li>Es mayor de 18 años.</li>
              <li>El contenido publicado es verídico, preciso y propio.</li>
              <li>Cuenta con los derechos sobre las imágenes publicadas.</li>
              <li>No infringe derechos de terceros ni contraviene la legislación vigente.</li>
              <li>No promueve actividades ilegales de ningún tipo.</li>
            </ul>
            <p>
              Privé Relax se reserva el derecho de verificar, moderar, suspender o eliminar cualquier perfil o
              contenido que a su exclusivo criterio incumpla estos términos, sin necesidad de notificación previa.
            </p>
          </Section>

          <Section title="5. Prohibiciones">
            <p>Queda estrictamente prohibido:</p>
            <ul>
              <li>Publicar contenido de menores de edad o que los involucre de cualquier forma.</li>
              <li>Utilizar el Sitio para promover trata de personas, explotación sexual o cualquier actividad ilícita.</li>
              <li>Publicar imágenes de terceros sin su consentimiento expreso.</li>
              <li>Realizar actividades de scraping, indexación automatizada o abuso técnico del Sitio.</li>
              <li>Suplantar la identidad de otra persona o entidad.</li>
              <li>Publicar información falsa o engañosa.</li>
            </ul>
          </Section>

          <Section title="6. Propiedad Intelectual">
            <p>
              Todos los elementos del Sitio —diseño, logotipos, textos, código fuente, estructura y marca "Privé
              Relax"— son propiedad exclusiva de sus titulares y están protegidos por las leyes de propiedad intelectual
              aplicables.
            </p>
            <p>
              Queda prohibida su reproducción total o parcial, distribución, modificación o uso comercial sin
              autorización escrita previa. Ver también la sección DMCA en nuestra{' '}
              <Link href="/privacidad#dmca" className="text-[#D4AF37] hover:underline">Política de Privacidad</Link>.
            </p>
          </Section>

          <Section title="7. Limitación de Responsabilidad">
            <p>
              En la máxima medida permitida por la ley, Privé Relax, sus directores, empleados y colaboradores no serán
              responsables de daños directos, indirectos, incidentales, especiales o consecuentes que surjan del uso o
              la imposibilidad de uso del Sitio, incluyendo —sin limitación— pérdida de datos, lucro cesante o daño a
              la reputación.
            </p>
            <p>
              El Sitio se brinda "<em>tal como está</em>" sin garantías de ningún tipo, expresas o implícitas.
            </p>
          </Section>

          <Section title="8. Modificaciones del Sitio y los T&C">
            <p>
              Privé Relax se reserva el derecho de modificar, suspender o discontinuar el Sitio o cualquiera de sus
              funciones en cualquier momento y sin previo aviso. Asimismo, podremos actualizar estos T&C. La versión
              vigente siempre será la publicada en esta página, con la fecha de última actualización indicada al inicio
              del documento.
            </p>
          </Section>

          <Section title="9. Ley Aplicable y Jurisdicción">
            <p>
              Estos T&C se rigen por las leyes de la <strong>República Argentina</strong>. Cualquier controversia
              derivada de su interpretación o cumplimiento quedará sometida a los tribunales ordinarios competentes de
              la Ciudad Autónoma de Buenos Aires, renunciando las partes a cualquier otro fuero que pudiere
              corresponderles.
            </p>
          </Section>

          <Section title="10. Contacto">
            <p>
              Para consultas legales, denuncias de contenido o cualquier comunicación relacionada con estos T&C,
              podés contactarnos a través de la dirección de correo indicada en el pie de página del Sitio.
            </p>
          </Section>

        </div>
      </main>
      <Footer />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-[#D4AF37] mb-3 uppercase tracking-wider">{title}</h2>
      <div className="space-y-3 text-sm text-white/70 leading-relaxed [&_strong]:text-white [&_em]:text-white/80 [&_ul]:mt-2 [&_ul]:ml-4 [&_ul]:space-y-1.5 [&_ul]:list-disc [&_ul]:marker:text-[#D4AF37]/60">
        {children}
      </div>
    </section>
  )
}
