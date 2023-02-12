import { createSlice } from '@reduxjs/toolkit';

let id = 0;

export const settings = createSlice({
    name: 'screenSettings',
    initialState: {
    availablity_address:{},
    show_screen: false,
    customer_id:'',
    prefilled_address:{},
    cart_content:{},
    details_data:{},
    offer_id:'',
    primary_offer_response:[],
    supplementry_details:{},
    addition_offer_detail:false,
    isExistingUser:false,
  },
  reducers: {
    setAvailablityAddress: (state, action) => {
      state.availablity_address = action.payload;
    },
    displayInnerScreen: (state,action) =>{
      state.show_screen = action.payload;
    },
    displayAdditionalOfferDetial: (state,action) =>{
      state.addition_offer_detail = action.payload;
    },
    customerId:(state,action)=>{
      state.customer_id= action.payload
    },
    setPrefilledAddress:(state,action)=>{
      state.prefilled_address= action.payload
    },
    cartContent:(state,action)=>{
      state.cart_content= action.payload
    },
    setDetailsData:(state,action)=>{
      state.details_data= action.payload
    },
    setOfferId:(state,action)=>{
      state.offer_id= action.payload
    },
    primaryOfferResponse:(state,action)=>{
      state.primary_offer_response= action.payload
    },
    supplementryOffersDetails:(state,action)=>{
      state.supplementry_details= action.payload
    },
    setExistingUser:(state,action)=>{
      state.isExistingUser= action.payload
    }
  },
});

export const {cartContent, displayInnerScreen,customerId, 
  displayAdditionalOfferDetial,setAvailablityAddress,setPrefilledAddress,
  setDetailsData, setOfferId, primaryOfferResponse,
  supplementryOffersDetails, setExistingUser} = settings.actions;


export default settings.reducer;
