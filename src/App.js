import React from 'react';
import logo from './logo.svg';
import './App.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import SocialSupport from './assets/data.json';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);

    this.state = {
      selectedCategory: { label: 'Todas', value: 'any' },
      selectedOption: '',
      selectedType: '',
      selectedTypes: []
    }
  }

  handleChange = (selectedOption) => {

    if (selectedOption && selectedOption.label) {
      let oldSelection = this.state.selectedOption ? this.state.selectedOption.label : null;
      if (oldSelection !== selectedOption.label) {
        this.setState({ selectedTypes: selectedOption.types });
      }
    } else {
      this.setState({ selectedType: '' })
    }

    this.setState({ selectedOption });

  }
  handleChangeType = (selectedType) => {
    this.setState({ selectedType });
  }
  handleChangeCategory = (selectedCategory) => {

    selectedCategory = selectedCategory ? selectedCategory : { label: 'Todas', value: 'any' };
    this.setState({ selectedCategory });
  }

  render() {
    const { selectedOption, selectedType, selectedCategory } = this.state;
    const valueNetwork = selectedOption && selectedOption.value;
    const valueType = selectedType && selectedType.value;
    const categoryType = selectedCategory && selectedCategory.value;

    return (
      <section className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Imágenes dummy</h1>
        </header>
        <div className="App-container">
          <p className="App-intro">
            Selecciona la categoría de la imagen:
        </p>
          <Select
            name="category-type"
            value={categoryType}
            onChange={this.handleChangeCategory}
            options={SocialSupport.categoryes}
          />
          <p className="App-intro">
            Selecciona la red social:
        </p>
          <Select
            name="social-network-name"
            value={valueNetwork}
            onChange={this.handleChange}
            options={SocialSupport.social_networks}
          />
          {valueNetwork && (
            <Select
              name="social-network-type"
              value={valueType}
              onChange={this.handleChangeType}
              options={this.state.selectedTypes}
            />
          )}

          {valueType && (
            <p>
              Dimensión del recurso necesario:
            <br />Alto: {this.state.selectedType.height} px - Ancho: {this.state.selectedType.width} px.
          </p>
          )}
          {valueType && (
            <img
              className="App-mockSocialNetwork"
              alt="Imagen red social."
              src={`https://placeimg.com/${this.state.selectedType.width}/${this.state.selectedType.height}/${this.state.selectedCategory.value}`} />
          )}
        </div>
      </section>
    );
  }
}

export default App;
