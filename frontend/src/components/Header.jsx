export default function Header({onHome}){
  return (
    <header className="appHeader">
      <div className="appHeaderInner">
        <button className="appBrand" onClick={onHome} type="button" aria-label="Volver al inicio">
          <span className="appBrandMark" aria-hidden="true">
            <span>Q</span><span>A</span>
          </span>
          <span className="appBrandCopy">
            <strong>Quillo <em>Aprende</em></strong>
            <small>Plataforma de apoyo educativo</small>
          </span>
        </button>
        <div className="headerMessage">
          <span className="headerMessageDot" />
          <span>Educación para todos, desarrollo para Quillo</span>
        </div>
      </div>
    </header>
  );
}
