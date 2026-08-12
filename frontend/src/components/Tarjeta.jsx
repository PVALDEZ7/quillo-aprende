export default function Tarjeta({m,onOpen}){
  const math=String(m.area_nombre||'').toLowerCase().includes('matem');
  return <article className={`learningCard ${math?'learningCardMath':'learningCardCom'}`}>
    <div className="learningCardTop">
      <span className="subjectIcon" aria-hidden="true">{math?'∑':'Aa'}</span>
      <span className="levelTag">{m.nivel_nombre}</span>
    </div>
    <div className="subjectLine">{m.area_nombre} · {m.subarea_nombre}</div>
    <h3>{m.titulo}</h3>
    <p>{m.descripcion}</p>
    <div className="learningCardMeta"><span>◷ 15–20 min</span><span>● Recurso interactivo</span></div>
    <button className="cardPrimary" onClick={()=>onOpen(m)} type="button">Aprender y practicar <span>→</span></button>
  </article>
}
