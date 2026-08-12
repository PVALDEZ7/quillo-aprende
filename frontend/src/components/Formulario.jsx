import {useEffect,useMemo,useState} from 'react';
const empty={titulo:'',descripcion:'',contenido:'',ficha:'',id_nivel:1,id_area:1,id_subarea:1};
export default function Formulario({initial,onSave,catalog,onCancel}){
 const [f,setF]=useState(empty);
 useEffect(()=>setF(initial?{...initial}:empty),[initial]);
 const subs=useMemo(()=>catalog.subareas.filter(s=>Number(s.id_area)===Number(f.id_area)),[catalog.subareas,f.id_area]);
 useEffect(()=>{if(subs.length&&!subs.some(s=>Number(s.id_subarea)===Number(f.id_subarea)))setF(x=>({...x,id_subarea:subs[0].id_subarea}))},[f.id_area,subs]);
 const ch=e=>setF({...f,[e.target.name]:e.target.value});
 const submit=e=>{e.preventDefault();onSave({...f,id_nivel:Number(f.id_nivel),id_area:Number(f.id_area),id_subarea:Number(f.id_subarea)})};
 return <form className="panel teacherForm" onSubmit={submit}>
  <div className="sectionHeading"><span className="sectionIcon">＋</span><div><h3>{initial?'Editar material':'Registrar material'}</h3><p>Completa la información que verá el estudiante en su catálogo de aprendizaje.</p></div></div>
  <div className="formGrid">
    <label className="span2">Título<input name="titulo" value={f.titulo} onChange={ch} placeholder="Ej.: Series y patrones sencillos" required/></label>
    <label className="span2">Descripción<textarea rows="2" name="descripcion" value={f.descripcion} onChange={ch} placeholder="Describe brevemente qué aprenderá el estudiante" required/></label>
    <label>Nivel<select name="id_nivel" value={f.id_nivel} onChange={ch}>{catalog.levels.map(x=><option key={x.id_nivel} value={x.id_nivel}>{x.nombre}</option>)}</select></label>
    <label>Área<select name="id_area" value={f.id_area} onChange={ch}>{catalog.areas.map(x=><option key={x.id_area} value={x.id_area}>{x.nombre}</option>)}</select></label>
    <label className="span2">Subárea<select name="id_subarea" value={f.id_subarea} onChange={ch}>{subs.map(x=><option key={x.id_subarea} value={x.id_subarea}>{x.nombre}</option>)}</select></label>
    <label className="span2">Explicación<textarea rows="6" name="contenido" value={f.contenido} onChange={ch} placeholder="Explica el tema de forma clara, sencilla y didáctica" required/></label>
    <label className="span2">Ficha descargable<textarea rows="5" name="ficha" value={f.ficha} onChange={ch} placeholder="Escribe aquí el contenido de la ficha que se descargará en formato .txt" required/></label>
  </div>
  <div className="formHint"><span>i</span><p><strong>Importante:</strong> los retos de los materiales precargados se muestran automáticamente. Si un material nuevo aún no tiene preguntas asociadas, el estudiante verá una indicación clara en lugar de un reto vacío.</p></div>
  <div className="formActions"><button className="btnPrimary" type="submit">✓ {initial?'Guardar cambios':'Guardar material'}</button>{initial&&<button className="btnGhost" type="button" onClick={onCancel}>Cancelar edición</button>}</div>
 </form>
}
