
export const isDevEnv = true






export const API = { BASE_URL: 'http://pouch-env.eba-cgj2f5rs.ap-south-1.elasticbeanstalk.com'}






export const urlConstants = () => {

    return {
        LOGIN_URL: API.BASE_URL + '/login/init',
        LOGIN_ATTEMPT_URL: API.BASE_URL + '/login/attempt',
        CARDS_CATEGORY_URL: API.BASE_URL + '/cards/categories',
        CARDS_LIST_URL: API.BASE_URL + '/cards',

        
        
    }
}


export const httpMethods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELET',
    HEAD: 'HEAD',
    PATCH: 'PATCH'
}

