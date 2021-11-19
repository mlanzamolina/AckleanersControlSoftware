import React, { useEffect} from "react";
import {useCollectionData } from "react-firebase-hooks/firestore";
import {collection} from "@firebase/firestore";
import {db} from "./firebase";

function Lista () {

  const [empleados, loading, error] = useCollectionData(collection(db, "empleados"), {idField: "id"});

  useEffect(() => {
      console.log(empleados);
    },[empleados])


  return (
    <div>
      {empleados ? empleados.map((empleado) => (
                    <div key={empleado.id}>
                      <p/> {empleado.nombre} 
                    </div>
                  )): null}
    </div>
  );
}

export default Lista;
