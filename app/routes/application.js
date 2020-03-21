import Route from '@ember/routing/route';
import fetch from 'fetch'

const allowed_params = ["message", "cow", "balloon_type"]

const queryParams = {};
allowed_params.forEach(param => queryParams[param] = {refreshModel: true})

const defaultParams = {
  "message": "test",
  "cow": "stegosaurus",
  "balloon_type": "thought"
}

export default class ApplicationRoute extends Route {
  queryParams = queryParams;

  model(rawParams) {
    const params = this.santizeParams(rawParams)
    return this.postSay(params)
  }

  santizeParams(rawParams) {
    const params = {}
    Object.keys(rawParams).forEach(param => {
      if (allowed_params.includes(param) && rawParams[param] !== undefined) {
        params[param] = rawParams[param]
      }
    }) 
    return params
  }

  async postSay(optionalParams) {
    console.log(JSON.stringify({...defaultParams, ...optionalParams}))

    const response = await fetch(`say`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...defaultParams, ...optionalParams})
    })

    if (response.status === 200) {
      return await response.json()  
    }

    return 'nope'
    // .then(function(response) {
    //   console.log(response.json())
    //   return response.json();
    // }).then(function(data) {
    //   console.log(data)
    // });
  }
}
