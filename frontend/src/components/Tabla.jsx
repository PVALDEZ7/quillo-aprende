export default function Tabla({rows,onEdit,onDelete}){
  return <div className="tablewrap modernTable"><table><thead><tr><th>Material</th><th>Nivel</th><th>Área / subárea</th><th>Acciones</th></tr></thead><tbody>
    {rows.length===0&&<tr><td colSpan="4" className="emptyCell">No hay materiales con estos filtros.</td></tr>}
    {rows.map(r=><tr key={r.id_material}>
      <td><strong>{r.titulo}</strong><small>{r.descripcion}</small></td>
      <td><span className="tablePill">{r.nivel_nombre}</span></td>
      <td>{r.area_nombre}<small>{r.subarea_nombre}</small></td>
      <td><div className="tableActions"><button type="button" onClick={()=>onEdit(r)}>✎ Editar</button><button type="button" className="danger" onClick={()=>onDelete(r.id_material)}>⌫ Eliminar</button></div></td>
    </tr>)}
  </tbody></table></div>
}
