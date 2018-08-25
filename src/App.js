import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Spinner from './components/Spinner/Spinner';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Signin from './components/Form/Signin/Signin';
import Register from './components/Form/Register/Register';

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

  signout = () => {
    this.setState({isSignedIn: false})
  }

  changeLoginState = () => {
    this.setState({isSignedIn: true});
  }

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
    const { isSignedIn } = this.state;
    
    return (
      <BrowserRouter>
        <div className="App">
          <Particles className='particles' params={particlesOptions} />
          <Spinner show={this.props.loading} />
          <Navigation signout={this.signout} onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          <Route exact path='/' render={() => (
            this.state.isSignedIn ? <Redirect to='/home' /> : <Register isSignedIn={this.changeLoginState} loadUser={this.loadUser} setLoading={this.props.setLoading} />
          )} />
          <Route path='/home' render={() => (
            this.state.isSignedIn ?
            <div className='home'>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onButtonSubmit={this.onButtonSubmit }
                onInputChange={(event) => this.props.onInputChange(event.target.value)} />
              <FaceRecognition box={this.props.box} imageURL={this.props.input} />
            </div>
            : <Redirect to='/register' />
          )} />
          <Route path='/signin' render={() => <Signin isSignedIn={this.changeLoginState} loadUser={this.loadUser} setLoading={this.props.setLoading} />} />
          <Route path='/register' render={() => <Register isSignedIn={this.changeLoginState} loadUser={this.loadUser} setLoading={this.props.setLoading} />} />
        </div>
      </BrowserRouter>
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
