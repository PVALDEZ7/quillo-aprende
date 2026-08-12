export default function Home({ go }) {
  return (
    <main className="coverPage">
      <div className="coverTopline"><span>QUILLO APRENDE</span><small>Plataforma web de apoyo educativo</small></div>
      <section className="coverFrame" aria-label="Portada de Quillo Aprende">
        <img className="coverArtwork" src="/portada-quillo.png" alt="Plataforma web de apoyo educativo para el distrito de Quillo"/>
        <button className="coverHotspot coverHotspotStudent" type="button" onClick={() => go('student')} aria-label="Ingresar como estudiante"><span className="srOnly">Ingresar como estudiante</span></button>
        <button className="coverHotspot coverHotspotTeacher" type="button" onClick={() => go('teacher-login')} aria-label="Ingresar como docente"><span className="srOnly">Ingresar como docente</span></button>
      </section>
      <section className="coverQuickbar" aria-label="Accesos a la plataforma">
        <button className="quickStudent" type="button" onClick={() => go('student')}><span>🎓</span><b>Estudiante</b><small>Explorar materiales y retos</small></button>
        <button className="quickTeacher" type="button" onClick={() => go('teacher-login')}><span>✎</span><b>Docente</b><small>Gestionar materiales</small></button>
        <button className="quickAdmin" type="button" onClick={() => go('admin-login')}><span>⚙</span><b>Administrador</b><small>Gestionar cuentas</small></button>
      </section>
    </main>
  );
}
