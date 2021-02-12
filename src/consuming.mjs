import setText, {appendText, showWaiting, hideWaiting} from './results.mjs';

// handling a fullfilled promise
export function get() {
    
    axios.get("http://localhost:3000/orders/1")
        .then(({ data }) => {
           return setText(JSON.stringify(data));
        });

}


// handling a rejected promise
export function getCatch(){
  return axios.get("http://localhost:3000/orders/123")
    .then(({ data }) => {
        setText(JSON.stringify(data));
    })
        .catch(err => setText(err));


}

export function chain(){
    return axios.get("http://localhost:3000/orders/1")
    .then(({ data }) => {
    return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
        .then(({ data }) => { 
            setText(`City: ${data.city}`);
        });


}

export function chainCatch() {
    axios
        .get("http://localhost:3000/orders/1")
        .then(({ data }) => {
            return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`
            );
        })
            .then(({ data }) => { 
                setText(`City: ${data.city}`);
            })
        
            .catch(err => {
                setText(err);
               
            })
    }




export function final() {
    showWaiting();
    axios
        .get("http://localhost:3000/orders/1")
        .then(({ data }) => {
            console.log("Data", data)
            return axios.get(
                `http://localhost:3000/addresses/${data.shippingAddress}`
            );
        })
        .then(({ data }) => {
            setText(`City: ${data.city}`);
        })
        .catch(err =>
            setText(err))
        .finally(() => {
            setTimeout(() => {
                hideWaiting();
            }, 1000
            );
            setTimeout(() => { appendText(" -- completely done!")},2000);
        });   
            

}
