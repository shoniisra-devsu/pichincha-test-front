import Layout from "@components/Layout";
import Fila from "@components/Fila";
import { useState } from "react";

const Home = ({ personas }) => {
  const [buscar, setBuscar] = useState("");

  let simpleLocation = personas.map((order) => {
    return {
      location: order.location,
    };
  });
  return (
    <Layout title="Random Persona | Pichincha">
      <h2 className="text-2xl mb-8 text-center">
        Start editing to see some magic happen!
      </h2>

        <input
          className="x-full container"
          type="text"
          placeholder="Buscar Persona"
          onChange={handleInputChange}
        />
       

      <table className="x-full container">
        <tr>
          <th className="px-8 capitalize">street.name</th>
          <th className="px-8 capitalize">city</th>
          <th className="px-8 capitalize">state</th>
          <th className="px-8 capitalize">country</th>
          <th className="px-8 capitalize">postcode</th>
          <th className="px-8 capitalize">coordinates.latitude</th>
          <th className="px-8 capitalize">coordinates.longitude</th>
        </tr>
        {simpleLocation.map((item, i) => (
          <tr>            
            <td className="px-8">{item.location.street.name}</td>
            <td className="px-8">{item.location.city}</td>
            <td className="px-8">{item.location.state}</td>
            <td className="px-8">{item.location.country}</td>
            <td className="px-8">{item.location.postcode}</td>
            <td className="px-8">{item.location.coordinates.latitude}</td>
            <td className="px-8">{item.location.coordinates.longitude}</td>
          </tr>
        ))}
      </table>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch("https://randomuser.me/api/?results=20");
  const { results } = await res.json();
  const personas = results.map((persona, index) => {
    return {
      ...persona,
    };
  });
  return {
    props: { personas },
  };
};

export default Home;
