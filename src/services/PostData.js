export function PostData(type, userData) {
    let BaseURL = 'http://dev-tesvasslatam.pantheonsite.io/';
    return new Promise((resolve, reject) =>{


        fetch(BaseURL+type, {
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem("access_token")
            },
            method: 'POST',
            body: JSON.stringify(userData)
          })
          .then((response) => response.json())
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
}
