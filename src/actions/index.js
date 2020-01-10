import { useState} from 'react';





export const heroku = (e) => dispatch =>{
  e.preventDefault();
  let link = e.target.getAttribute('href');

  dispatch({
    type: 'newLink',
    payload: link
  })



  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const corsLink = proxyurl + link;


  let xhr = new XMLHttpRequest();
  xhr.open('GET', corsLink);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.send();

  xhr.onprogress = function (event) {
    console.log(event)
  };
    xhr.onreadystatechange = function () {
      console.log(xhr.status)
      console.log(xhr.readyState)
      if (xhr.status === 200 && xhr.readyState === 4) {
        dispatch({
          type: 'loadStatus'        
        })
      }  else if (xhr.status !== 200) {
        console.log(xhr.status, xhr.readyState)
        dispatch({
          type: 'loadFailed'
        })
      }
    }
  }


    export const reset = (e) => dispatch => {
      dispatch({
        type: 'reset',
      })
  }


