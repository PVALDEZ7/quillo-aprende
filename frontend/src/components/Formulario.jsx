import {useEffect,useMemo,useState} from 'react';

const blankQuestion=()=>({pregunta:'',opciones:['','','',''],respuesta_correcta:''});
const freshEmpty=()=>({
 titulo:'',descripcion:'',contenido:'',ficha:'',id_nivel:1,id_area:1,id_subarea:1,
 preguntas:[blankQuestion(),blankQuestion(),blankQuestion()]
});

function normalizeInitial(initial){
 if(!initial)return freshEmpty();
 const source=Array.isArray(initial.preguntas)?initial.preguntas:[];
 const preguntas=[0,1,2].map(i=>{
  const q=source[i]||blankQuestion();
  const opciones=Array.isArray(q.opciones)?[...q.opciones]:[q.opcion_a,q.opcion_b,q.opcion_c,q.opcion_d];
  return{
   pregunta:String(q.pregunta||''),
   opciones:[0,1,2,3].map(j=>String(opciones[j]||'')),
   respuesta_correcta:String(q.respuesta_correcta||'')
  };
 });
 return{
  titulo:String(initial.titulo||''),descripcion:String(initial.descripcion||''),contenido:String(initial.contenido||''),ficha:String(initial.ficha||''),
  id_nivel:Number(initial.id_nivel||1),id_area:Number(initial.id_area||1),id_subarea:Number(initial.id_subarea||1),preguntas
 };
}

export default function Formulario({initial,onSave,catalog,onCancel}){
 const[f,setF]=useState(freshEmpty());
 const[saving,setSaving]=useState(false);
 const[localMsg,setLocalMsg]=useState('');
 useEffect(()=>{setF(normalizeInitial(initial));setLocalMsg('')},[initial]);
 const subs=useMemo(()=>catalog.subareas.filter(s=>Number(s.id_area)===Number(f.id_area)),[catalog.subareas,f.id_area]);
 useEffect(()=>{if(subs.length&&!subs.some(s=>Number(s.id_subarea)===Number(f.id_subarea)))setF(x=>({...x,id_subarea:subs[0].id_subarea}))},[f.id_area,subs]);
 const ch=e=>{setLocalMsg('');setF({...f,[e.target.name]:e.target.value})};
 const changeQuestion=(qi,value)=>{setLocalMsg('');setF(prev=>({...prev,preguntas:prev.preguntas.map((q,i)=>i===qi?{...q,pregunta:value}:q)}))};
 const changeOption=(qi,oi,value)=>{setLocalMsg('');setF(prev=>({...prev,preguntas:prev.preguntas.map((q,i)=>{
  if(i!==qi)return q;
  const old=q.opciones[oi];const opciones=[...q.opciones];opciones[oi]=value;
  return{...q,opciones,respuesta_correcta:q.respuesta_correcta===old?value:q.respuesta_correcta};
 })}))};
 const changeCorrect=(qi,value)=>{setLocalMsg('');setF(prev=>({...prev,preguntas:prev.preguntas.map((q,i)=>i===qi?{...q,respuesta_correcta:value}:q)}))};

 const submit=async e=>{
  e.preventDefault();
  if(saving)return;
  const preguntas=f.preguntas.map(q=>({
   pregunta:q.pregunta.trim(),
   opciones:q.opciones.map(x=>x.trim()),
   respuesta_correcta:q.respuesta_correcta.trim()
  }));
  const payload={...f,titulo:f.titulo.trim(),descripcion:f.descripcion.trim(),contenido:f.contenido.trim(),ficha:f.ficha.trim(),id_nivel:Number(f.id_nivel),id_area:Number(f.id_area),id_subarea:Number(f.id_subarea),preguntas};
  if(!payload.titulo||!payload.descripcion||!payload.contenido||!payload.ficha){setLocalMsg('Completa todos los campos obligatorios antes de guardar.');return}
  const preguntasValidas=preguntas.length===3&&preguntas.every(q=>q.pregunta&&q.opciones.length===4&&q.opciones.every(Boolean)&&q.respuesta_correcta&&q.opciones.includes(q.respuesta_correcta));
  if(!preguntasValidas){setLocalMsg('Completa las 3 preguntas: cada una necesita 4 alternativas y debes seleccionar su respuesta correcta.');return}
  try{
   setSaving(true);setLocalMsg('Guardando material y reto...');
   const ok=await onSave(payload);
   if(ok){
    setLocalMsg(initial?'✓ Cambios y reto guardados correctamente.':'✓ Material y reto de 3 preguntas registrados correctamente.');
    if(!initial)setF(freshEmpty());
   }else setLocalMsg('No se pudo guardar. Revisa el mensaje de error mostrado en el panel.');
  }finally{setSaving(false)}
 };

 return <form className="panel teacherForm" onSubmit={submit}>
  <div className="sectionHeading"><span className="sectionIcon">＋</span><div><h3>{initial?'Editar material':'Registrar material'}</h3><p>Completa la información y registra el reto que verá el estudiante.</p></div></div>
  <div className="formGrid">
   <label className="span2">Título<input name="titulo" value={f.titulo} onChange={ch} placeholder="Ej.: Series y patrones sencillos" required/></label>
   <label className="span2">Descripción<textarea rows="2" name="descripcion" value={f.descripcion} onChange={ch} placeholder="Describe brevemente qué aprenderá el estudiante" required/></label>
   <label>Nivel<select name="id_nivel" value={f.id_nivel} onChange={ch}>{catalog.levels.map(x=><option key={x.id_nivel} value={x.id_nivel}>{x.nombre}</option>)}</select></label>
   <label>Área<select name="id_area" value={f.id_area} onChange={ch}>{catalog.areas.map(x=><option key={x.id_area} value={x.id_area}>{x.nombre}</option>)}</select></label>
   <label className="span2">Subárea<select name="id_subarea" value={f.id_subarea} onChange={ch}>{subs.map(x=><option key={x.id_subarea} value={x.id_subarea}>{x.nombre}</option>)}</select></label>
   <label className="span2">Explicación<textarea rows="6" name="contenido" value={f.contenido} onChange={ch} placeholder="Explica el tema de forma clara, sencilla y didáctica" required/></label>
   <label className="span2">Ficha descargable<textarea rows="5" name="ficha" value={f.ficha} onChange={ch} placeholder="Escribe aquí el contenido de la ficha que se convertirá en PDF" required/></label>
  </div>

  <section className="challengeEditor">
   <div className="challengeEditorHead"><span>★</span><div><h4>Reto de 3 preguntas</h4><p>Completa exactamente 3 preguntas. Cada una debe tener 4 alternativas y una respuesta correcta.</p></div></div>
   {f.preguntas.map((q,qi)=><fieldset className="questionEditorCard" key={qi}>
    <legend><span>{qi+1}</span> Pregunta {qi+1}</legend>
    <label>Enunciado<input value={q.pregunta} onChange={e=>changeQuestion(qi,e.target.value)} placeholder={`Escribe la pregunta ${qi+1}`} required/></label>
    <div className="questionOptionsEditor">
     {q.opciones.map((op,oi)=><label key={oi}>Opción {String.fromCharCode(65+oi)}<input value={op} onChange={e=>changeOption(qi,oi,e.target.value)} placeholder={`Alternativa ${String.fromCharCode(65+oi)}`} required/></label>)}
    </div>
    <label className="correctAnswerLabel">Respuesta correcta
     <select value={q.respuesta_correcta} onChange={e=>changeCorrect(qi,e.target.value)} required>
      <option value="">Selecciona la alternativa correcta</option>
      {q.opciones.map((op,oi)=><option key={oi} value={op} disabled={!op.trim()}>{op.trim()?`${String.fromCharCode(65+oi)}) ${op}`:`Opción ${String.fromCharCode(65+oi)} (completa primero)`}</option>)}
     </select>
    </label>
   </fieldset>)}
  </section>

  <div className="formHint"><span>i</span><p><strong>Importante:</strong> al guardar, el material y sus 3 preguntas se publican juntos. El estudiante podrá resolver el reto y descargar la ficha en PDF.</p></div>
  {localMsg&&<div className={localMsg.startsWith('No ')||localMsg.startsWith('Completa')?'error':'notice'} style={{marginTop:'12px'}}>{localMsg}</div>}
  <div className="formActions"><button className="btnPrimary" type="submit" disabled={saving}>{saving?'Guardando...':`✓ ${initial?'Guardar cambios':'Guardar material'}`}</button>{initial&&<button className="btnGhost" type="button" onClick={onCancel} disabled={saving}>Cancelar edición</button>}</div>
 </form>
}
