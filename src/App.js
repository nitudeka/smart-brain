import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Spinner from './components/Spinner/Spinner';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Form from './components/Form/Form';

const particlesOptions = {
  particles: {
    number: {
      value: 130,
      density: {
        enable: true,
        value_area: 1250
      }
    }
  }
}

const initialState = {
  input: '',
  imageURL: '',
  loading: false,
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  state = initialState;

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  onButtonSubmit = () => {
    fetch('https://immense-waters-65123.herokuapp.com/imageUrl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.props.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://immense-waters-65123.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log);
        }
        this.props.faceLocationBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  render() {
    const { isSignedIn, route } = this.state;
    
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Spinner show={this.props.loading} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === 'home' 
          ? 
          <div className='home'>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onButtonSubmit={this.onButtonSubmit }
              onInputChange={(event) => this.props.onInputChange(event.target.value)} />
            <FaceRecognition box={this.props.box} imageURL={this.props.input} />
          </div>
          : <Form loadUser={this.loadUser} form={this.state.route} onRouteChange={this.onRouteChange} setLoading={this.props.setLoading} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    input: state.input,
    loading: state.loading,
    box: state.box
  }
}

const mapDispatchTopProps = dispatch => {
  return {
    onInputChange: (input) => dispatch({type: 'INPUT', input: input}),
    setLoading: () => dispatch({type: 'LOADING'}),
    faceLocationBox: (box) => dispatch({type: 'FACE_LOCATION_BOX', box: box})
  }
}

export default connect(mapStateToProps, mapDispatchTopProps)(App);
