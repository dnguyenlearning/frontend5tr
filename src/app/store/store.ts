import { KHUVUC_CHANGED, GETLIST_PRODUCTS, GETLIST_PRODUCT_GIACAM, GETLIST_PRODUCT_THUYSAN, GETLIST_PRODUCT_THUCPHAMCHAY, GETLIST_PRODUCT_TRAICAY, GETLIST_PRODUCT_RAUSACH, GETLIST_SANPHAM_PAGE, GET_SANPHAMSHOW, CHANGE_PAGE, OPEN_MODAL, SHOW_SEARCH_ICON } from './../actions/actions';
import * as _ from 'lodash';
export interface IAppState{
    khuvuc:string;
    productsHome:any[];
    filterProductsHome:any[];
    giacamProducts:any[];
    giacamProductsFilter:any[];
    thuysanProducts:any[];
    thuysanProductsFilter:any[];
    rausachProducts:any[];
    rausachProductsFilter:any[];
    traicayProducts:any[];
    traicayProductsFilter:any[];
    thucphamchayProducts:any[];
    thucphamchayProductsFilter:any[];
    sanphamProducts:any[];
    sanphamProductsFilter:any[];
    sanphamShow:any[];
    change_page:string;
    open_modal:boolean;
    show_search_icon:boolean;
}

export const INITIAL_STATE:IAppState={
    khuvuc:'',
    productsHome:[],
    filterProductsHome:[],
    giacamProducts:[],
    giacamProductsFilter:[],
    thuysanProducts:[],
    thuysanProductsFilter:[],
    rausachProducts:[],
    rausachProductsFilter:[],
    thucphamchayProducts:[],
    thucphamchayProductsFilter:[],
    traicayProducts:[],
    traicayProductsFilter:[],
    sanphamProducts:[],
    sanphamProductsFilter:[],
    sanphamShow:[],
    change_page:'',
    open_modal:false,
    show_search_icon:false

}

function filterProducts(state,khuvuc, startProducts){
    let filterProducts=startProducts;
    let updatedProducts=[];
    if(khuvuc!='tatca'){
        if(startProducts.length)
        updatedProducts=filterProducts.filter(product=>product.khuvuc==khuvuc)
    }else{
        updatedProducts=startProducts;
    }
    return updatedProducts;
}

export function rootReducer(state:IAppState,action):IAppState{
    switch(action.type){
        case KHUVUC_CHANGED :  
            let homeStartProducts=[...state.productsHome];
            let giacamStartProducts=[...state.giacamProducts];
            let thuysanStartProducts=[...state.thuysanProducts];
            let rausachStartProducts=[...state.rausachProducts];
            let thucphamchayStartProducts=[...state.thucphamchayProducts];
            let traicayStartProducts=[...state.traicayProducts];
            let sanphamStartProducts=[...state.sanphamProducts];
            let khuvuc=action.khuvuc;
            return {...state,khuvuc:khuvuc , 
                filterProductsHome:filterProducts(state,khuvuc, homeStartProducts) , 
                giacamProductsFilter:filterProducts(state,khuvuc,giacamStartProducts),
                thuysanProductsFilter:filterProducts(state,khuvuc,thuysanStartProducts),
                thucphamchayProductsFilter:filterProducts(state,khuvuc,thucphamchayStartProducts),
                traicayProductsFilter:filterProducts(state,khuvuc,traicayStartProducts),
                rausachProductsFilter:filterProducts(state,khuvuc,rausachStartProducts),
                sanphamProductsFilter:filterProducts(state,khuvuc,sanphamStartProducts)
            };
        case GETLIST_PRODUCTS: 
            let beginProductsHome=action.listProducts;
            return {...state, productsHome:beginProductsHome, 
                filterProductsHome:filterProducts(state,state.khuvuc,beginProductsHome),
            }
        case GETLIST_PRODUCT_GIACAM: 
            let beginProductsGiaCam=action.listProducts;
            return {...state, giacamProducts:beginProductsGiaCam,
                giacamProductsFilter:filterProducts(state,state.khuvuc,beginProductsGiaCam),
            }
        case GETLIST_PRODUCT_THUYSAN:
            let beginProductsThuysan=action.listProducts;
            return {...state, thuysanProducts:beginProductsThuysan,
                thuysanProductsFilter:filterProducts(state,state.khuvuc,beginProductsThuysan),
            }
        case GETLIST_PRODUCT_THUCPHAMCHAY:
            let beginProductsThucphamchay=action.listProducts;
            return {...state, thucphamchayProducts:beginProductsThucphamchay,
                thucphamchayProductsFilter:filterProducts(state,state.khuvuc,beginProductsThucphamchay),
            }
        case GETLIST_PRODUCT_TRAICAY:
            let beginProductsTraicay=action.listProducts;
            return {...state, traicayProducts:beginProductsTraicay,
                traicayProductsFilter:filterProducts(state,state.khuvuc,beginProductsTraicay),
            } 
        case GETLIST_PRODUCT_RAUSACH:
            let beginProductsRausach=action.listProducts;
            return {...state, rausachProducts:beginProductsRausach,
                rausachProductsFilter:filterProducts(state,state.khuvuc,beginProductsRausach),
            }
        case GETLIST_SANPHAM_PAGE:
            let beginSanphamPage=action.listProducts;
            return {...state, sanphamProducts:beginSanphamPage,
                sanphamProductsFilter:filterProducts(state,state.khuvuc,beginSanphamPage)
            }
        case GET_SANPHAMSHOW:
            return {...state, sanphamShow:action.sanphamShow}

        case OPEN_MODAL: return {...state, open_modal:!state.open_modal};

        case SHOW_SEARCH_ICON: return {...state, show_search_icon:action.show}
        default : return state;
    }
    
}