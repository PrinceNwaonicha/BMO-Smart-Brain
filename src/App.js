import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import 'tachyons'
import './App.css';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import { loadFull } from 'tsparticles';
import Particles from "./Components/particles/particles"

const particlesInit = async (main) => {

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };



const initState = {
    input: '',
      imageUrl: '',
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
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
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
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('InputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
}

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
        fetch('https://morning-earth-38527.herokuapp.com/imageurl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            input: this.state.input
            })
          })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://morning-earth-38527.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: `${count}` }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    } 
    this.setState({ route: route })

  }
  render() {
    const { isSignedIn, box, imageUrl, route } = this.state
    return (
      <div className="App">
        <Particles
          init={particlesInit}
        />

        <Navigation isSignedIn ={isSignedIn } onRouteChange={ this.onRouteChange }/>
        {route === 'home'
          ? <div>
              <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
              <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
              />
            <FaceRecognition
              box={box}
              imageUrl={imageUrl}
            />
            </div>
          
          : (
            route === 'signin'
              ? <Signin
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
              : <Register
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
          )
          
        }
    </div>
  );
  }
  
}

export default App;
