import  { verifyJwtToken} from "./lib/auth";
import { NextResponse } from "next/server";
const AUTH_PAGES=[
    '/login',
    '/register',
    '/forgot-password'
]
const isAuthPages=(url)=>AUTH_PAGES.some((page)=>page.startsWith(url));
export async function middleware(request){
    const {url,nextUrl,cookies}=request;
    const {value:token}=cookies.get('token')??{value:null};
    
    const hasVerifiedToken=token&& await verifyJwtToken(token);
    const isAuthPageRequested= isAuthPages(nextUrl.pathname);

    if(isAuthPageRequested){
        if(!hasVerifiedToken){
            const response=NextResponse.next();
            return response;
        }

        const response = NextResponse.redirect(new URL('/', request.url));
        return response;
    }

    if(!hasVerifiedToken){
        const searcParams=new URLSearchParams(nextUrl.searcParams);
        searcParams.set('next',nextUrl.pathname);


        return NextResponse.redirect(new URL(`/login?${searcParams}`,url));
    }

    return NextResponse.next();
    console.log(hasVerifiedToken);
}

//hangi sayfalarda bu middlewarei kullanacagımızı belirliyoruz..
export const config={
    matcher:[
        '/login',
        '/profile',
        '/register',

    ]
}

/*       */