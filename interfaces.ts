export interface ProviderItem{
    _id: string,
    name: string,
    address: string,
    tel: string,
    email: string,
    picture: string,
    openTime: string,
    closeTime: string,
    __v: number,
    id: string
}
export interface ProviderJson{
    success:boolean,
    data:ProviderItem[]
}

export interface CarItem{
    _id: string,
    name: string,
    vin_plate: string,
    picture: string,
    provider_info: ProviderItem,
    capacity: number,
    model: string,
    pricePerDay: number,
    __v: number,
    id: string
}
export interface CarJson{
    success:boolean,
    data:CarItem[]
}

export interface UserItem{
    _id: string,
    name: string,
    email: string,
    tel: string,
    role: string,
    createdAt: string,
    __v: number,
    id: string
}

export interface BookingVirtual_Car{
    _id: string,
    name: string,
    vin_plate: string,
    id: string
}

export interface BookingVirtual_User{
    _id: string,
    name: string,
}

export interface ReservationItem{
    _id:string,
    car_info:BookingVirtual_Car,
    user_info:BookingVirtual_User,
    startDate:string,
    endDate:string,
    status:string,
    iDate:string,
    __v:number
}

export interface ReservationJson{
    success:boolean,
    count:number,
    data:ReservationItem[]
}