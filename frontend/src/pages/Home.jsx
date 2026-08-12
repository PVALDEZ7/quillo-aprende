export default function Home({ go }) {
  return (
    <main className="coverPage">
      <section className="coverFrame" aria-label="Portada de Quillo Aprende">
        <img
          className="coverArtwork"
          src="/portada-quillo.png"
          alt="Plataforma web de apoyo educativo para el distrito de Quillo"
        />

        <button
          className="coverHotspot coverHotspotStudent"
          type="button"
          onClick={() => go('student')}
          aria-label="Ingresar como estudiante"
          title="Ingresar como estudiante"
        >
          <span className="srOnly">Ingresar como estudiante</span>
        </button>

        <button
          className="coverHotspot coverHotspotTeacher"
          type="button"
          onClick={() => go('teacher-login')}
          aria-label="Ingresar como docente"
          title="Ingresar como docente"
        >
          <span className="srOnly">Ingresar como docente</span>
        </button>
      </section>

      <section className="coverMobileActions" aria-label="Accesos a la plataforma">
        <button className="coverMobileStudent" type="button" onClick={() => go('student')}>
          Ingresar como estudiante
        </button>
        <button className="coverMobileTeacher" type="button" onClick={() => go('teacher-login')}>
          Ingresar como docente
        </button>
      </section>
    </main>
  );
}
