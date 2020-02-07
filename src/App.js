import React, { Suspense } from 'react';
import './App.css';
import ComponentList from './components/componentList/componentList';
import ComponentView from './components/componentView/componentView';

class App extends React.Component {
  state = {
    category: '',
    data:[],
    loading:true,
    selectedComponent: ''    
  }

  selectComponent = e => {
    console.log(e.key);
    this.setState({
      selectedComponent: e.item.props.value, 
      style: e.item.props.styleitem, 
      usage: e.item.props.usage
    });
  }

  componentDidMount() {
    //load the json data
    fetch('data.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      this.setState({
        loading: false,
        data: data.data
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>CSS Guidelines</h1>
        </header>
        <section className="flex-container">
        <Suspense
          fallback={<h1>Loading profile...</h1>}
        >
          <ComponentList data={this.state.data} onSelect={this.selectComponent} />
          <ComponentView 
            data={this.state.data} 
            selectedComponent={this.state.selectedComponent} 
            style={this.state.style}
            usage={this.state.usage}
          /> 
        </Suspense>
        </section>
      </div>
    );
  }
  
}

export default App;
