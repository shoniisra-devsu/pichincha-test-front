import React, { Component } from "react";
import Layout from "@components/Layout";
import Fila from "@components/Fila";
import { useState } from "react";
import SearchBar from "@components/SearchBar";
class Home extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      personasListDefault: [],
      personasListFiltered: [],
      personasSlicedPage: [],
      selectedPage: 1,
      peoplePerPage: 10,
    };
    this.handleSeachInputChange = this.handleSeachInputChange.bind(this);
  }

  componentDidMount() {
    const { personas } = this.props;
    const firstBlogPage =
      personas.length > this.state.peoplePerPage
        ? personas.slice(0, this.state.peoplePerPage)
        : personas;
    this.setState({ peoplePerPage: 10 });
    this.setState({ personasListDefault: personas });
    this.setState({ personasListFiltered: personas });
    this.setState({ personasSlicedPage: firstBlogPage });
    this.setState({ selectedPage: 1 });
  }
  handleSeachInputChange(event) {
    const searchInput = event.target.value;
    const filteredBlogsBySearchInput = this.state.personasListDefault.filter((itemPersona) => {
      const isIncluded = JSON.stringify(itemPersona)
        .toLowerCase()
        .includes(searchInput.toLowerCase());      
      return isIncluded;
    });

    const firstBlogPage =
      filteredBlogsBySearchInput.length > this.state.peoplePerPage
        ? filteredBlogsBySearchInput.slice(0, this.state.peoplePerPage)
        : filteredBlogsBySearchInput;

    this.setState({ searchInput: searchInput });
    this.setState({ personasListFiltered: filteredBlogsBySearchInput });
    this.setState({ personasSlicedPage: firstBlogPage });
    this.setState({ selectedPage: 1 });
  } 

  render() {
    return (
    <Layout title="Random Persona | Pichincha">
      <h2 className="text-2xl mb-8 text-center">
        Start editing to see some magic happen!
      </h2>

        <input
          className="x-full container"
          type="text"
          placeholder="Buscar Persona"
          key="random1"
          value={this.state.searchInput}
          onChange={this.handleSeachInputChange}
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
        {this.state.personasSlicedPage.map((item, i) => (
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
  }

  
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
