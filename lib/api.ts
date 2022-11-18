import { deleteCookie, getCookie, setCookie } from "./cookie";



function fetchApi() {

    async function post<JSON = any>(url: string, object: any,): Promise<JSON> {
        
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                // 'Allow-Access-Control-Origin': `${absoluteUrl()}`,
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${await getCookie('auth')}`,
            },
            body: JSON.stringify(object)
        })
        const data = await response.json()
        return data
      
    }

    async function get<JSON = any>(url: string, object: any = null): Promise<JSON> {
        
        const response = await fetch(url + `${ object ? `?${new URLSearchParams(object)}` : ''}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                // 'Allow-Access-Control-Origin': `${absoluteUrl()}`,
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${await getCookie('auth')}`,
            },
        })
        const data = await response.json()
        return data
      
    }

    async function auth<JSON = any>(url: string, object: any,): Promise<JSON> {
        console.log('url:', absoluteUrl())
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(object)
        })
        const data = await response.json()
        await setCookie('auth', data.accessToken, 360)
        return data
    }

    async function signOut(): Promise<void> {
        try{

            await deleteCookie('auth')
            if(typeof window !== 'undefined') window.location.reload()

        } catch(err){

            console.log('An error occurred when logging out: ', err)
            if(typeof window !== 'undefined') window.location.reload()

        }
    }

    return {post,  get, auth, signOut}
}



const Api = fetchApi();

export default Api



//--------------------------------------

function absoluteUrl() {
    if(typeof window !== 'undefined') {
        const url = window.location.href
        return url
        // return window.location.hostname;
    }
}
