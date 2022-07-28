export type UserData = {
    userId:string;
    displayName:string;
    email:string;
    phoneNumber?:string;
    dob:Date;
    photoURL:string;
    gender:'male' | 'female' | 'other' | 'not-specified';
    emailVerified:boolean;
    access:UserAccess;
    status:UserStatus;
    nickName?:string;
    state?:string;
    city?:string;
    pincode?:string;
    address:string;
    aadhaarNumber:string;
    tutorialCompleted:boolean;
    panCardNumber:string;
    onboardingDone:boolean;
    payoutDetailsCompleted:boolean;
    primaryPayoutAccount:FundAccount | null;
    payoutFundAccount:FundAccount[];
    kycStatus:'pending' | 'approved' | 'rejected';
    onboardingSteps:{
        phoneDobDone:boolean;
        panDone:boolean;
        locationDone:boolean;
        aadhaarDone:boolean;
    }
}
export type FundAccount = {
    name:string;
    email:string;
    contact:string;
    accountId:string;
    accountType:'bank_account'|'vpa'|'card';
    bankAccountName?:string;
    accountNumber?:string;
    ifsc?:string;
    vpa?:string;
    cardNumber?:string;
    cardName?:string;
}
export type bloodGroup={
    bloodGroup:'A+'|'A-'|'B+'|'B-'|'AB+'|'AB-'|'O+'|'O-'|'Unknown';
}
export type department ={
    department:'godown'|'office'
}
export type designation = {
    designation:'godownInCharge'|'transportManager'|'unloadingSupervisor'|'loadingSupervisor'|'sapSeniorOperator'|'sapOperator'
}
export type UserStatus = {
    isOnline:boolean;
    access:'active' | 'inactive' | 'blocked' | 'deleted';
}

export type Friend ={
    userID:string;
    displayName:string;
    photoURL:string;
    email:string;
}
export type CustomizedProduct={
    product:Product;
    quantity:number;
}
export type Product={
    productId:string;
    name:string;
    description:string;
    price:number;
    image:Image[];
    category:string;
    subCategory:string;
    discount:Discount;
}
export type Image={
    url:string;
}

export type Discount={
    type:'Fixed' |'Percentage';
    value:number;
    featureText:string;
}

export type UserAccess={
    access:'admin'|'guest'|'worker'|'supervisor';
}
export type Order={
    orderId:string;
    items:[];
    total:number;
    date:Date;
    totalTax:number;
    totalShipping:number;
    totalDiscount:number;
    couponUsed:Coupon;
    payment:Payment;
    shipping:Shipping;
}
export type Coupon={
    couponId:string;
    code:string;
    discount:number;
    discountType:'Percentage'|'Fixed';
}
export type Payment={
    paymentId:string;
    paymentType:'Cash'|'Card'|'Paypal'|'GooglePay'|'ApplePay';
    paymentMethod:string;
    paymentStatus:'Pending'|'Success'|'Failed';
}
export type Shipping={
    shippingId:string;
    shippingType:'Standard'|'Express'|'Overnight';
    shippingMethod:string;
    shippingStatus:'Pending'|'Success'|'Failed';
}

export type ContactRequest = {
    name:string;
    email:string;
    phoneNumber:string;
    message:string;
    date:Date;
}

