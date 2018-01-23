import React from 'react';
import logo from './logo.svg';
import './App.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import SocialSupport from './assets/data.json';


class App extends React.Component {

  /**
   * 
   * @param props declaramos las propiedades que va a tener nuestro componente, así como también le decimos que eventos va a tener que escuchar y a qué función reacionar, por eso se hace un .bind() de la función.
   *  Se setea el estado inicial de cada propiedad.
   */
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

  /**
   * Realiza el manejo de eventos cuando se cambia el valor de la red social elegida. Se actualiza también el estado de la propiedad correspondiente.
   */
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

  /**
   * Realiza el manejo de eventos cuando se cambia el valor del tipo de red social que tenemos elegida. Se actualiza también el estado de la propiedad correspondiente.
   */
  handleChangeType = (selectedType) => {
    this.setState({ selectedType });
  }

  /**
  * Realiza el manejo de eventos cuando se cambia el valor del tipo de imagen que queremos que traiga por defecto. Se actualiza también el estado de la propiedad correspondiente.
  */
  handleChangeCategory = (selectedCategory) => {

    selectedCategory = selectedCategory ? selectedCategory : { label: 'Todas', value: 'any' };
    this.setState({ selectedCategory });
  }

  /**
   * renderizamos el componente en el DOM virtual que genera react.
   */
  render() {
    /**
     * Creamos las constantes con los valores que queremos emplear en el componente. Así como sus estados iniciales.
     */
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
          {/* Utiliza el componente de selectores y lo rellenamos con la información que traemos de un json de configuraciones. */}
          <Select
            name="category-type"
            value={categoryType}
            onChange={this.handleChangeCategory}
            options={SocialSupport.categoryes}
          />
          <p className="App-intro">
            Selecciona la red social:
        </p>
          {/* Mostramos solo el componente si tiene los valores correspondientes para su funcionamiento. */}
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
          {/* Mostramos las características del archivo y la imagen por defecto, si tiene los valores correspondientes para su funcionamiento, así evitamos cualquier tipo de error. */}
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


/**
 * Exportamos el componente de nuestra App generado.
 */
export default App;
