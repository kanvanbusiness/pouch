import axios from 'axios';


export async function makeAxiosRequest(url, method, headers, dataParams) {

    requestPayload=
    {
     url:url,
     method:method,
     headers:headers,
     request:dataParams 
    }
 
    console.log("REQUEST_PAYLOD","<<<<<<<<<<<<<<<-------------------->>>>>>>>>>>>")
    console.log("REQUEST_PAYLOD",requestPayload)


    return dataParams ? axios({
        method: method,
        url: url,
        data: dataParams,
        headers: headers,
        timeout: 180000,
    }) : axios({
        method: method,
        url: url,
        headers: headers,
        data: null,
        timeout: 180000,
    })



  

}

export async function makeFetchRequest(url, method, headers, dataParams) {

    const response = dataParams ? await fetch(url,
        {
            method: method,
            headers: headers,
            body:dataParams,
        }
    ) : await fetch(url,
        {
            method: method,
            headers: headers
        }
    )

console.warn(response)

    const responseCode = response.status;
    if (response.ok && response._bodyText && responseCode === 200) {
        const responseJson = await response.json();
        return { data: responseJson, status: response.status };
    }
    else {
        return response
    }

}


// export const preactivationApi = (locale) => {

//     var setPreactivationUrl = urlConstants.PREACTIVATION + "?locale=" + locale + "&isPreActivation=true"
//     console.log("setPreactivationUrl +++++++", setPreactivationUrl);

//     return axios(setPreactivationUrl, {
//         method: 'get',
//         headers: {
//             'Content-Type': 'application/json',
//             'cct-x-env-header': 'CCT_Base'
//         }
//     });

// }





