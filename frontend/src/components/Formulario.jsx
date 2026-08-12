import {useEffect,useMemo,useState} from 'react';

const questionEmpty=()=>({pregunta:'',opciones:['','','',''],respuesta_correcta:''});
const empty={titulo:'',descripcion:'',contenido:'',ficha:'',id_nivel:1,id_area:1,id_subarea:1,preguntas:[questionEmpty(),questionEmpty(),questionEmpty()]};

function normalizeQuestions(items=[]){
  return [0,1,2].map(i=>{
    const q=items[i]||{};
    const opciones=Array.isArray(q.opciones)?q.opciones:[q.opcion_a,q.opcion_b,q.opcion_c,q.opcion_d];
    return {
      pregunta:q.pregunta||'',
      opciones:[opciones?.[0]||'',opciones?.[1]||'',opciones?.[2]||'',opciones?.[3]||''],
      respuesta_correcta:q.respuesta_correcta||''
    };
  });
}

export default function Formulario({initial,onSave,catalog,onCancel}){
 const [f,setF]=useState(empty);
 useEffect(()=>{
   if(initial){
     setF({...initial,preguntas:normalizeQuestions(initial.preguntas)});
   }else{
     setF({...empty,preguntas:[questionEmpty(),questionEmpty(),questionEmpty()]});
   }
 },[initial]);
 const subs=useMemo(()=>catalog.subareas.filter(s=>Number(s.id_area)===Number(f.id_area)),[catalog.subareas,f.id_area]);
 useEffect(()=>{if(subs.length&&!subs.some(s=>Number(s.id_subarea)===Number(f.id_subarea)))setF(x=>({...x,id_subarea:subs[0].id_subarea}))},[f.id_area,subs]);
 const ch=e=>setF({...f,[e.target.name]:e.target.value});
 const qChange=(qi,field,value)=>setF(prev=>({...prev,preguntas:prev.preguntas.map((q,i)=>i===qi?{...q,[field]:value}:q)}));
 const optionChange=(qi,oi,value)=>setF(prev=>({...prev,preguntas:prev.preguntas.map((q,i)=>i===qi?{...q,opciones:q.opciones.map((op,j)=>j===oi?value:op),respuesta_correcta:q.respuesta_correcta===q.opciones[oi]?value:q.respuesta_correcta}:q)}));
 const submit=e=>{
   e.preventDefault();
   const preguntas=f.preguntas.map(q=>({...q,pregunta:q.pregunta.trim(),opciones:q.opciones.map(x=>x.trim()),respuesta_correcta:q.respuesta_correcta.trim()}));
   const incompleta=preguntas.some(q=>!q.pregunta||q.opciones.some(op=>!op)||!q.respuesta_correcta||!q.opciones.includes(q.respuesta_correcta));
   if(incompleta){alert('Completa las 3 preguntas, sus 4 alternativas y selecciona la respuesta correcta.');return;}
   onSave({...f,id_nivel:Number(f.id_nivel),id_area:Number(f.id_area),id_subarea:Number(f.id_subarea),preguntas});
 };
 return <form className="panel form" onSubmit={submit}><h3>{initial?'Editar material y reto':'Registrar material'}</h3>
  <label>Título<input name="titulo" value={f.titulo} onChange={ch} required/></label>
  <label>Descripción<textarea name="descripcion" value={f.descripcion} onChange={ch} required/></label>
  <div className="row"><label>Nivel<select name="id_nivel" value={f.id_nivel} onChange={ch}>{catalog.levels.map(x=><option key={x.id_nivel} value={x.id_nivel}>{x.nombre}</option>)}</select></label><label>Área<select name="id_area" value={f.id_area} onChange={ch}>{catalog.areas.map(x=><option key={x.id_area} value={x.id_area}>{x.nombre}</option>)}</select></label><label>Subárea<select name="id_subarea" value={f.id_subarea} onChange={ch}>{subs.map(x=><option key={x.id_subarea} value={x.id_subarea}>{x.nombre}</option>)}</select></label></div>
  <label>Explicación<textarea rows="5" name="contenido" value={f.contenido} onChange={ch} required/></label>
  <label>Ficha descargable<textarea rows="5" name="ficha" value={f.ficha} onChange={ch} required/></label>

  <section className="questionEditor">
    <div className="questionEditorHead"><div><span className="eyebrow">RETO INTERACTIVO</span><h3>3 preguntas para el estudiante</h3></div><small>Estas preguntas aparecerán debajo de la explicación, como en los materiales iniciales.</small></div>
    {f.preguntas.map((q,qi)=><fieldset className="questionBox" key={qi}>
      <legend>Pregunta {qi+1}</legend>
      <label>Enunciado<input value={q.pregunta} onChange={e=>qChange(qi,'pregunta',e.target.value)} placeholder={qi===0?'Ej.: ¿Qué sigue? 2, 4, 6, 8, __':''} required/></label>
      <div className="questionOptions">
        {q.opciones.map((op,oi)=><label key={oi}>Alternativa {String.fromCharCode(65+oi)}<input value={op} onChange={e=>optionChange(qi,oi,e.target.value)} required/></label>)}
      </div>
      <label>Respuesta correcta<select value={q.respuesta_correcta} onChange={e=>qChange(qi,'respuesta_correcta',e.target.value)} required><option value="">Seleccionar respuesta</option>{q.opciones.map((op,oi)=><option key={oi} value={op} disabled={!op}>{op||`Alternativa ${String.fromCharCode(65+oi)}`}</option>)}</select></label>
    </fieldset>)}
  </section>

  <div className="actions"><button className="primary">{initial?'Guardar cambios':'Guardar material y 3 preguntas'}</button>{initial&&<button type="button" onClick={onCancel}>Cancelar</button>}</div>
 </form>
}
